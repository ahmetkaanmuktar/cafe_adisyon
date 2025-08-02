// Google Apps Script kodu - Google Sheets'e iç tüketim verilerini kaydetmek için
// Bu kodu Google Apps Script'te yeni bir proje olarak oluşturun

function doPost(e) {
  try {
    // Gelen JSON verisini parse et
    const data = JSON.parse(e.postData.contents);
    
    // Google Sheets ID'si - Kendi sheets ID'nizi buraya yazın
    const SHEET_ID = '1QjmdQKijrmEus1w0MTTn9xtQHOy57UwcVlj5_FQeIGw';
    
    // Spreadsheet'i aç
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // İlk sheet'i al (veya istediğiniz sheet adını yazın)
    let sheet = spreadsheet.getActiveSheet();
    
    // Eğer sheet boşsa başlıkları ekle
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tarih', 'Müşteri Adı', 'Ürün', 'Adet', 'Birim Fiyat', 'Toplam Fiyat']);
    }
    
    // Yeni satır ekle  
    sheet.appendRow([
      data.tarih,
      data.musteriAdi,  // masaAdi yerine musteriAdi
      data.urun,
      data.adet,
      data.birimFiyat,
      data.toplamFiyat
    ]);
    
    // Başarılı yanıt döndür
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Veri başarıyla kaydedildi'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Hata durumunda
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // GET isteklerini de destekle (test için)
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Mahmud Cafe Sipariş API çalışıyor'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test fonksiyonu - Google Apps Script editöründe test etmek için
function testFunction() {
  const testData = {
    tarih: new Date().toLocaleString('tr-TR'),
    masaAdi: 'Test Masası',
    urun: '🫖 Çay',
    adet: 2,
    birimFiyat: 7.5,
    toplamFiyat: 15
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}