// Google Apps Script for Cafe Adisyon System
// Deploy as web app with access: Anyone

const SHEET_ID = '1QjmdQKijrmEus1w0MTTn9xtQHOy57UwcVlj5_FQeIGw';
const PENDING_CUSTOMERS_SHEET_NAME = 'Bekleyen Müşteriler';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Check if this is a customer approval request
    if (data.action === 'requestApproval') {
      return handleCustomerApprovalRequest(data);
    }
    
    // Check if this is an approval response
    if (data.action === 'approveCustomer') {
      return handleCustomerApproval(data);
    }
    
    // Regular order submission
    return handleOrderSubmission(data);
    
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

function handleCustomerApprovalRequest(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let pendingSheet = spreadsheet.getSheetByName(PENDING_CUSTOMERS_SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!pendingSheet) {
      pendingSheet = spreadsheet.insertSheet(PENDING_CUSTOMERS_SHEET_NAME);
      pendingSheet.appendRow(['Tarih', 'Müşteri Adı', 'Durum', 'Onay Tarihi']);
    }
    
    const customerName = data.customerName || 'Bilinmeyen';
    const currentTime = new Date();
    
    // Check if customer already exists
    const existingData = pendingSheet.getDataRange().getValues();
    const customerExists = existingData.slice(1).some(row => 
      row[1] === customerName && row[2] === 'Bekliyor'
    );
    
    if (customerExists) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          message: 'Bu müşteri adı zaten onay bekliyor' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new customer request
    pendingSheet.appendRow([currentTime, customerName, 'Bekliyor', '']);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Onay talebiniz gönderildi. Admin onayı bekleniyor.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Müşteri onay talebi hatası:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleCustomerApproval(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const pendingSheet = spreadsheet.getSheetByName(PENDING_CUSTOMERS_SHEET_NAME);
    
    if (!pendingSheet) {
      throw new Error('Bekleyen müşteriler sayfası bulunamadı');
    }
    
    const customerName = data.customerName;
    const isApproved = data.approved;
    const currentTime = new Date();
    
    // Find and update the customer status
    const existingData = pendingSheet.getDataRange().getValues();
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][1] === customerName && existingData[i][2] === 'Bekliyor') {
        const status = isApproved ? 'Onaylandı' : 'Reddedildi';
        pendingSheet.getRange(i + 1, 3).setValue(status);
        pendingSheet.getRange(i + 1, 4).setValue(currentTime);
        break;
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: `Müşteri ${isApproved ? 'onaylandı' : 'reddedildi'}` 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Müşteri onay hatası:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleOrderSubmission(data) {
  try {
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
    console.error('Sipariş kaydetme hatası:', error.toString());
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
    
    if (action === 'getPendingCustomers') {
      // Bekleyen müşterileri getir
      return getPendingCustomers();
    }
    
    if (action === 'checkCustomerStatus') {
      // Müşteri durumunu kontrol et
      return checkCustomerStatus(e.parameter.customerName);
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

function getPendingCustomers() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const pendingSheet = spreadsheet.getSheetByName(PENDING_CUSTOMERS_SHEET_NAME);
    
    if (!pendingSheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          pendingCustomers: [] 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = pendingSheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          pendingCustomers: [] 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const pendingCustomers = data.slice(1).map(row => ({
      tarih: row[0] || '',
      customerName: row[1] || '',
      status: row[2] || '',
      approvalDate: row[3] || ''
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        pendingCustomers: pendingCustomers 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Bekleyen müşteriler getirilirken hata:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function checkCustomerStatus(customerName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const pendingSheet = spreadsheet.getSheetByName(PENDING_CUSTOMERS_SHEET_NAME);
    
    if (!pendingSheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          status: 'not_found' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = pendingSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === customerName) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            success: true, 
            status: data[i][2] || 'unknown',
            requestDate: data[i][0] || '',
            approvalDate: data[i][3] || ''
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        status: 'not_found' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Müşteri durumu kontrol edilirken hata:', error.toString());
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