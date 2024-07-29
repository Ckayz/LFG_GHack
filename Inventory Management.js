function onEdit(e) {
  // Check if the event object is defined and the edited sheet is 'Inventory'
  if (e && e.range && e.range.getSheet().getName() === 'Inventory') {
    updateInventoryAndReorder();
  }
}

function updateInventoryAndReorder() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Active Spreadsheet: " + spreadsheet.getName());

  var sheet = spreadsheet.getSheetByName('Inventory'); // Ensure the sheet name is correct
  var ordersSheet = spreadsheet.getSheetByName('Supplier Orders'); // Ensure the "Supplier Orders" sheet name is correct

  // Check if the sheets exist
  if (!sheet) {
    Logger.log("Sheet 'Inventory' not found!");
    return; // Exit the function if the sheet is not found
  }
  if (!ordersSheet) {
    Logger.log("Sheet 'Supplier Orders' not found!");
    return; // Exit the function if the sheet is not found
  }

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var itemName = data[i][0];
    var currentStock = data[i][1];

    // Add logging to check the data type and value of currentStock
    Logger.log("Row " + (i + 1) + ": currentStock type = " + typeof currentStock + ", value = " + currentStock);

    // Skip rows that do not contain valid inventory data
    if (isNaN(currentStock) || currentStock === '') {
      Logger.log("Skipping row " + (i + 1) + " due to invalid stock value: " + currentStock);
      continue;
    }

    var supplierEmail = data[i][4];
    var supplierName = data[i][3];
    Logger.log("Row " + (i + 1) + ": itemName = " + itemName + ", currentStock = " + currentStock + ", supplierEmail = " + supplierEmail);

    if (currentStock < 30) { // Original threshold for reordering
      var reorderUnit = 100 - currentStock;
      sheet.getRange(i + 1, 3).setValue(reorderUnit); // Update Reorder Unit

      if (supplierEmail && supplierEmail.trim() !== '') {
        Logger.log("Sending reorder email to: " + supplierEmail);
        sendReorderEmail(itemName, currentStock, reorderUnit, supplierEmail.trim());
        updateOrderDates(sheet, i + 1, reorderUnit);
        logOrder(ordersSheet, supplierName, itemName, reorderUnit);
        // Update the current stock in the sheet
        sheet.getRange(i + 1, 2).setValue(100); // Assuming stock is refilled to 100
        // Reset Reorder Unit to 0 after restocking
        sheet.getRange(i + 1, 3).setValue(0);
      } else {
        Logger.log("No supplier email for item: " + itemName + " at row: " + (i + 1));
      }
    }
  }
}

function sendReorderEmail(itemName, currentStock, reorderUnit, supplierEmail) {
  var subject = 'Reorder Request: ' + itemName;
  var body = 'The stock level for ' + itemName + ' is below 30.\n\n' +
             'Current Stock Level: ' + currentStock + '\n' +
             'Reorder Unit: ' + reorderUnit + '\n\n' +
             'Please process this reorder request as soon as possible.\n\n' +
             'Thank you.';

  Logger.log("Email details - To: " + supplierEmail + ", Subject: " + subject + ", Body: " + body);
  MailApp.sendEmail(supplierEmail, subject, body);
}

function updateOrderDates(sheet, rowIndex, reorderUnit) {
  var today = new Date();
  sheet.getRange(rowIndex, 6).setValue(today); // Update Last Order Date

  var leadTime = sheet.getRange(rowIndex, 8).getValue(); // Time to delivery (days)

  // Check if lead time is valid
  if (!leadTime || isNaN(leadTime)) {
    Logger.log("Invalid lead time at row " + rowIndex);
    return; // Exit the function if lead time is invalid
  }

  var receivedDate = new Date(today);
  receivedDate.setDate(today.getDate() + leadTime);
  sheet.getRange(rowIndex, 7).setValue(receivedDate); // Update Last Received Date

  // Optionally increase the current stock level by the reorder unit
  var currentStock = sheet.getRange(rowIndex, 2).getValue();
  sheet.getRange(rowIndex, 2).setValue(currentStock + reorderUnit);
}

function logOrder(ordersSheet, supplierName, itemName, reorderUnit) {
  var today = new Date();
  var expectedDeliveryDate = new Date(today);
  expectedDeliveryDate.setDate(today.getDate() + 7); // Assuming a lead time of 7 days for simplicity

  var lastRow = ordersSheet.getLastRow();
  Logger.log("Logging order: Date = " + today + ", Supplier = " + supplierName + ", Item = " + itemName + ", Quantity = " + reorderUnit + ", Expected Delivery = " + expectedDeliveryDate);
  ordersSheet.appendRow([today, supplierName, itemName, reorderUnit, expectedDeliveryDate, "Received"]);
}

// Function to update the order status
function updateOrderStatus(orderRow, newStatus) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ordersSheet = spreadsheet.getSheetByName('Supplier Orders'); // Ensure the "Supplier Orders" sheet name is correct

  // Check if the sheet exists
  if (!ordersSheet) {
    Logger.log("Sheet 'Supplier Orders' not found!");
    return; // Exit the function if the sheet is not found
  }

  // Update the status in the specified row
  ordersSheet.getRange(orderRow, 6).setValue(newStatus); // Assuming the status is in the 6th column
  Logger.log("Updated order status at row " + orderRow + " to " + newStatus);
}

// Function to mark an order as received manually
function markOrderAsReceived(orderRow) {
  var newStatus = "Received";
  updateOrderStatus(orderRow, newStatus);
}
