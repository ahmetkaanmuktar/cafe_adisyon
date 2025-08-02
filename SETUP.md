# 🚀 Mahmud Cafe Sipariş Sistemi - Kurulum Rehberi

## ⚡ Hızlı Başlangıç (5 Dakika)

### 1️⃣ Google Sheets Oluştur
1. [Google Sheets](https://sheets.google.com) → Yeni tablo
2. Dosya adı: `Mahmud Cafe Siparişleri`
3. URL'den ID'yi kopyala: `docs.google.com/spreadsheets/d/[BU_KISIM]/edit`

### 2️⃣ Google Apps Script Kur
1. [Google Apps Script](https://script.google.com) → Yeni proje
2. `google-apps-script.js` dosyasındaki kodu yapıştır
3. `SHEET_ID` kısmına kendi ID'ni yaz
4. **Kaydet** (Ctrl+S)

### 3️⃣ Web Uygulaması Olarak Dağıt
1. **Dağıt** → **Yeni dağıtım**
2. **Tür**: Web uygulaması
3. **Çalıştır**: Benim adıma
4. **Erişim**: Herkes
5. **Dağıt** → **Web App URL'ini kopyala**

### 4️⃣ HTML'e Bağla
1. `index.html` dosyasını aç
2. `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` yerine URL'ni yapıştır
3. **Kaydet**

### 5️⃣ Test Et! 🎉
1. `index.html`'i tarayıcıda aç
2. Müşteri adı gir
3. Sipariş ver
4. Google Sheets'i kontrol et!

---

## 🔧 Hata Çözümleri

### ❌ "Sipariş kaydedilirken hata oluştu"
**Çözüm:**
1. **F12** → **Console** → Hata mesajını kontrol et
2. **Network** tab → İstek durumunu kontrol et
3. Google Apps Script'te **yeniden dağıt**
4. **Yeni URL** al ve HTML'e yapıştır

### 🔐 "Google hasn't verified this app"
**Normal durum!** 
1. **Advanced** → **Go to ... (unsafe)**
2. **Allow** → İzinleri ver

### 📊 Google Sheets'e Veri Gitmiyor
1. **SHEET_ID** doğru mu?
2. **Web App URL** doğru mu?
3. **İzinler** verildi mi?
4. **Yeniden dağıt** dene

---

## 🎯 Özellikler

### ✨ Anlık Siparişler
- **12 saat** boyunca görünür
- **Otomatik kaybolma**
- **Manuel temizleme**

### 💾 Müşteri Adı Hafızası
- **12 saat** boyunca hatırlanır
- **Otomatik doldurma**
- **Kolay değiştirme**

### 📱 Responsive Tasarım
- **Mobil uyumlu**
- **Tablet optimized**
- **Modern UI/UX**

---

## 📞 Destek

Sorun yaşıyorsan:
1. **Tarayıcı konsolu** kontrol et
2. **Network tab** kontrol et  
3. **Google Apps Script logs** kontrol et
4. **Yeniden dağıt** dene

**Demo Mode:** Google Apps Script bağlanmazsa otomatik demo moduna geçer.

---

## 🎨 Özelleştirme

### Ürün Ekleme/Çıkarma
`index.html` → `products` objesi

### Fiyat Değiştirme  
`products` objesindeki `price` değerleri

### Tasarım Değiştirme
CSS kısmındaki renk ve boyut değerleri

**Kolay kurulum için tüm adımları takip et!** 🚀