# Mahmud Cafe - Sipariş Takip Sistemi

Bu proje, Mahmud Cafe için Google Sheets entegrasyonlu bir sipariş takip sistemidir. Her masa kendi adını yazarak sipariş verebilir ve tüm siparişler otomatik olarak Google Sheets'e kaydedilir.

## 🍽️ Özellikler

- **Sabit Ürün Listesi**: Çay, Su, Tost, Ayran gibi cafe ürünleri
- **Masa Bazlı Sipariş**: Her masa kendi adını yazarak sipariş verir
- **Google Sheets Entegrasyonu**: Tüm siparişler otomatik olarak kaydedilir
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Kullanıcı Dostu Arayüz**: Emoji'li, modern ve sade tasarım

## 📋 Ürün Listesi ve Fiyatlar

- 🫖 **Çay** – 7.5 TL
- 💧 **Küçük Su** – 10 TL
- 🚰 **Büyük Su** – 7.5 TL
- 🥪 **Tost (Yarım)** – 60 TL
- 🥪🧀 **Tost (Tam)** – 120 TL
- 🥛 **Ayran** – 10 TL

## 🚀 Kurulum

### 1. Google Sheets Hazırlığı

1. Google Drive'da yeni bir Google Sheets dosyası oluşturun
2. Sheets dosyasının URL'indeki ID'yi kopyalayın
   - Örnek URL: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
   - ID: `1ABC123xyz`

### 2. Google Apps Script Kurulumu

1. [Google Apps Script](https://script.google.com) sitesine gidin
2. "Yeni Proje" butonuna tıklayın
3. `google-apps-script.js` dosyasındaki kodu kopyalayıp yapıştırın
4. Kod içindeki `YOUR_GOOGLE_SHEETS_ID_HERE` kısmını kendi Sheets ID'nizle değiştirin
5. Projeyi kaydedin (Ctrl+S)
6. "Dağıt" > "Yeni Dağıtım" seçin
7. Tür olarak "Web uygulaması" seçin
8. Şu ayarları yapın:
   - **Açıklama**: Mahmud Cafe API
   - **Şu şekilde çalıştır**: Benim adıma
   - **Şu kişiler erişebilir**: Herkes
9. "Dağıt" butonuna tıklayın
10. Çıkan Web App URL'ini kopyalayın

### 3. HTML Dosyası Yapılandırması

1. `index.html` dosyasını açın
2. JavaScript kısmında `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` yazan yeri, Google Apps Script'ten aldığınız Web App URL ile değiştirin
3. Dosyayı kaydedin

### 4. Test Etme

1. `index.html` dosyasını bir web tarayıcısında açın
2. Masa adı girin ve birkaç ürün seçin
3. "Siparişi Gönder" butonuna tıklayın
4. Google Sheets dosyanızı kontrol edin - sipariş verilerinin eklendiğini göreceksiniz

## 📊 Google Sheets Yapısı

Sistem otomatik olarak şu sütunları oluşturur:

| Tarih | Masa Adı | Ürün | Adet | Birim Fiyat | Toplam Fiyat |
|-------|----------|------|------|-------------|--------------|
| 15.01.2024 14:30:25 | Masa 3 | 🫖 Çay | 2 | 7.5 | 15 |
| 15.01.2024 14:30:25 | Masa 3 | 🥪 Tost (Yarım) | 1 | 60 | 60 |

## 🎨 Özelleştirme

### Ürün Ekleme/Çıkarma

`index.html` dosyasında:

1. **HTML kısmında** yeni ürün bloğu ekleyin
2. **JavaScript'teki `products` objesine** yeni ürünü ekleyin
3. Fiyatları güncellemek için `products` objesindeki fiyat değerlerini değiştirin

### Tasarım Değişiklikleri

CSS kısmında renk, font ve layout ayarlarını değiştirebilirsiniz:

- **Ana renkler**: `#667eea`, `#764ba2` (gradient)
- **Vurgu rengi**: `#ff6b6b`, `#ee5a24`
- **Başarı rengi**: `#28a745`

## 🔧 Sorun Giderme

### Sipariş Gönderilmiyor
- Google Apps Script URL'inin doğru ayarlandığından emin olun
- Google Sheets ID'sinin doğru olduğunu kontrol edin
- Tarayıcı konsolundaki hata mesajlarını kontrol edin

### Google Sheets'e Veri Yazılmıyor
- Google Apps Script projesinin doğru dağıtıldığından emin olun
- Sheets dosyasının "Herkes" tarafından düzenlenebilir olduğunu kontrol edin
- Google Apps Script loglarını kontrol edin

### Demo Modu
Eğer Google Apps Script URL'i ayarlanmamışsa, sistem demo modunda çalışır ve siparişler sadece tarayıcı konsolunda görüntülenir.

## 📱 Kullanım

1. **Masa Adı Girin**: "Masa 3", "Ali'nin Masası" gibi
2. **Ürün Seçin**: + ve - butonlarıyla adet ayarlayın
3. **Toplam Kontrol**: Alt kısımda toplam tutar görüntülenir
4. **Gönder**: "Siparişi Gönder" butonuna tıklayın
5. **Onay**: Başarılı mesajı görüntülenir ve form sıfırlanır

## 🛡️ Güvenlik

- Google Apps Script otomatik olarak CORS (Cross-Origin) isteklerini destekler
- Tüm veriler Google'ın güvenli sunucularında saklanır
- Hassas bilgi içermediği için ek güvenlik önlemi gerekmez

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Tarayıcı konsolundaki hata mesajlarını kontrol edin
2. Google Apps Script loglarını inceleyin
3. Kurulum adımlarını tekrar gözden geçirin

---

**Not**: Bu sistem küçük ve orta ölçekli cafeler için tasarlanmıştır. Yoğun kullanım için Google Apps Script'in günlük limitlerini göz önünde bulundurun.