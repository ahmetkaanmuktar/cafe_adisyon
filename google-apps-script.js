// Google Apps Script for Cafe Adisyon System
// Deploy as web app with access: Anyone

const SHEET_ID = '1QjmdQKijrmEus1w0MTTn9xtQHOy57UwcVlj5_FQeIGw';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Prepare the row data with new 'ekleyen' field
    const rowData = [
      new Date(), // Tarih
      data.masaAdi || data.musteriAdi || 'Bilinmeyen', // Masa Adı
      data.urun || 'Bilinmeyen', // Ürün
      data.adet || 0, // Adet
      data.birimFiyat || 0, // Birim Fiyat
      data.toplamFiyat || 0, // Toplam Fiyat
      data.ekleyen === 'admin' ? 'İşletme Sahibi Ekledi' : 'Müşteri Ekledi' // Ekleyen
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Veri başarıyla kaydedildi' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Hata detayı:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Veri kaydedilirken hata oluştu'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'API çalışıyor',
      message: 'Cafe Adisyon API aktif'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to check sheet access
function testSheetAccess() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
    console.log('Mevcut başlıklar:', headers);
    return true;
  } catch (error) {
    console.error('Sheet erişim hatası:', error);
    return false;
  }
}