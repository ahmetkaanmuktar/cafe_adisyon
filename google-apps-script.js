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
  try {
    // URL parametrelerini kontrol et
    const action = e.parameter.action;
    
    if (action === 'getOrders') {
      // Siparişleri getir
      return getOrders();
    }
    
    // Varsayılan yanıt
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'API çalışıyor',
        message: 'Cafe Adisyon API aktif'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('doGet hatası:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrders() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // İlk satır başlık olduğu için atla
    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          orders: [] 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Verileri işle (başlık satırını atla)
    const orders = data.slice(1).map(row => ({
      tarih: row[0] || '',
      masaAdi: row[1] || '',
      urun: row[2] || '',
      adet: row[3] || 0,
      birimFiyat: row[4] || 0,
      toplamFiyat: row[5] || 0,
      ekleyen: row[6] || ''
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        orders: orders 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Siparişler getirilirken hata:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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