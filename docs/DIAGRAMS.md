# Diyagramlar

```json
{
  "diagrams": [
    {
      "id": "erd_001",
      "name": "CRM Sistemi Veritabanı İlişki Diyagramı",
      "type": "ERD",
      "mermaid_code": "erDiagram\n    MUSTERILER {\n        int musteri_id PK\n        string ad\n        string soyad\n        string email\n        string telefon\n        string adres\n        string segment\n        text notlar\n        datetime olusturma_tarihi\n        datetime guncelleme_tarihi\n    }\n    \n    FIRSATLAR {\n        int firsat_id PK\n        int musteri_id FK\n        string ad\n        decimal deger\n        int olasilik\n        string asamasi\n        date kapatma_tarihi\n        datetime olusturma_tarihi\n        datetime guncelleme_tarihi\n    }\n    \n    TEKLIFLER {\n        int teklif_id PK\n        int firsat_id FK\n        string teklif_numarasi\n        decimal toplam_tutar\n        decimal indirim\n        string durum\n        datetime olusturma_tarihi\n        datetime onay_tarihi\n    }\n    \n    GOREVLER {\n        int gorev_id PK\n        int atanan_kullanici_id FK\n        int musteri_id FK\n        string baslik\n        text aciklama\n        string oncelik\n        string durum\n        date son_tarih\n        datetime olusturma_tarihi\n    }\n    \n    KULLANICILAR {\n        int kullanici_id PK\n        string kullanici_adi\n        string email\n        string sifre_hash\n        string rol\n        boolean aktif\n        datetime son_giris\n    }\n    \n    ETKINLIKLER {\n        int etkinlik_id PK\n        int musteri_id FK\n        int kullanici_id FK\n        string tip\n        string baslik\n        text aciklama\n        datetime tarih\n    }\n    \n    MUSTERILER ||--o{ FIRSATLAR : \"sahip\"\n    FIRSATLAR ||--o{ TEKLIFLER : \"icin\"\n    KULLANICILAR ||--o{ GOREVLER : \"atar\"\n    MUSTERILER ||--o{ GOREVLER : \"ilgili\"\n    MUSTERILER ||--o{ ETKINLIKLER : \"sahip\"\n    KULLANICILAR ||--o{ ETKINLIKLER : \"kaydeder\""
    },
    {
      "id": "flowchart_001",
      "name": "CRM Sistemi İş Akışı",
      "type": "Flowchart",
      "mermaid_code": "flowchart TD\n    A[Müşteri Kaydı] --> B[Müşteri Profili Oluştur]\n    B --> C[Müşteri Segmentasyonu]\n    C --> D[Fırsat Belirleme]\n    D --> E[Fırsat Pipeline'a Ekle]\n    E --> F{Fırsat Uygun mu?}\n    F -->|Evet| G[Teklif Oluştur]\n    F -->|Hayır| H[Fırsat Reddet]\n    G --> I[Teklif Onay Süreci]\n    I --> J{Onaylandı mı?}\n    J -->|Evet| K[Müşteriye Gönder]\n    J -->|Hayır| L[Teklif Düzelt]\n    L --> I\n    K --> M{Müşteri Kabul Etti mi?}\n    M -->|Evet| N[Satış Kapanış]\n    M -->|Hayır| O[Takip Görevi Oluştur]\n    N --> P[Başarı Raporla]\n    O --> Q[Hatırlatma Ayarla]\n    Q --> R[Yeniden Temas]\n    R --> D\n    H --> S[Fırsat Kapatılı Raporla]\n    P --> T[Dashboard Güncelle]\n    S --> T"
    },
    {
      "id": "sequence_001",
      "name": "Teklif Oluşturma ve Onay Süreci",
      "type": "Sequence",
      "mermaid_code": "sequenceDiagram\n    participant KullaniciReact as Kullanıcı (React UI)\n    participant NodejsAPI as Node.js API\n    participant PostgreSQL as PostgreSQL DB\n    participant PDFService as PDF Oluşturma\n    participant EmailService as E-posta Servisi\n    participant RedisCache as Redis Cache\n    \n    KullaniciReact->>NodejsAPI: Teklif oluşturma isteği\n    NodejsAPI->>PostgreSQL: Fırsat bilgilerini getir\n    PostgreSQL->>NodejsAPI: Fırsat verileri\n    NodejsAPI->>PostgreSQL: Ürün/hizmet kataloğu getir\n    PostgreSQL->>NodejsAPI: Katalog verileri\n    NodejsAPI->>KullaniciReact: Teklif formu verileri\n    \n    KullaniciReact->>NodejsAPI: Teklif kaydetme isteği\n    NodejsAPI->>PostgreSQL: Teklif veritabanına kaydet\n    PostgreSQL->>NodejsAPI: Kayıt onayı\n    NodejsAPI->>RedisCache: Teklif önbelleğe al\n    NodejsAPI->>KullaniciReact: Kayıt başarılı\n    \n    KullaniciReact->>NodejsAPI: PDF oluşturma isteği\n    NodejsAPI->>PDFService: PDF oluştur\n    PDFService->>NodejsAPI: PDF dosyası\n    NodejsAPI->>PostgreSQL: PDF bilgilerini güncelle\n    NodejsAPI->>KullaniciReact: PDF hazır\n    \n    KullaniciReact->>NodejsAPI: Onaya gönderme isteği\n    NodejsAPI->>PostgreSQL: Teklif durumunu güncelle\n    NodejsAPI->>EmailService: Onaylayıcıya bildirim\n    EmailService->>NodejsAPI: E-posta gönderildi\n    NodejsAPI->>RedisCache: Durum önbelleği güncelle\n    NodejsAPI->>KullaniciReact: Onaya gönderildi"
    },
    {
      "id": "c4_context_001",
      "name": "CRM Sistemi Bağlam Diyagramı",
      "type": "C4 Context",
      "mermaid_code": "C4Context\n    title CRM Sistemi Bağlam Diyagramı\n    \n    Person(SatisTemsilcisi, \"Satış Temsilcisi\", \"CRM sistemini kullanarak müşteri ve fırsat yönetimi yapar\")\n    Person(SatisYoneticisi, \"Satış Yöneticisi\", \"Satış raporlarını inceler ve ekip performansını takip eder\")\n    Person(Musteri, \"Müşteri\", \"Teklifleri alır ve geri bildirim sağlar\")\n    \n    System(CRMSistemi, \"CRM Sistemi\", \"Müşteri ilişkileri yönetim sistemi. React.js frontend, Node.js backend, PostgreSQL veritabanı kullanır\")\n    \n    System_Ext(EmailSystem, \"E-posta Sistemi\", \"E-posta gönderimi ve bildirimler için SMTP servisi\")\n    System_Ext(PDFGenerator, \"PDF Oluşturma Servisi\", \"Teklif ve raporları PDF formatında oluşturur\")\n    System_Ext(AuthSystem, \"Kimlik Doğrulama\", \"JWT tabanlı kullanıcı kimlik doğrulama sistemi\")\n    System_Ext(ReportSystem, \"Raporlama Servisi\", \"Chart.js ile analiz ve raporlama\")\n    \n    Rel(SatisTemsilcisi, CRMSistemi, \"Müşteri bilgilerini yönetir, fırsat takibi yapar\")\n    Rel(SatisYoneticisi, CRMSistemi, \"Dashboard ve raporları görüntüler\")\n    Rel(Musteri, CRMSistemi, \"Teklifleri görüntüler ve onaylar\")\n    \n    Rel(CRMSistemi, EmailSystem, \"E-posta bildirimleri gönderir\")\n    Rel(CRMSistemi, PDFGenerator, \"Teklif ve rapor PDF'leri oluşturur\")\n    Rel(CRMSistemi, AuthSystem, \"Kullanıcı kimlik doğrulama\")\n    Rel(CRMSistemi, ReportSystem, \"Analiz ve grafik verileri\")"
    },
    {
      "id": "state_machine_001",
      "name": "Fırsat Durumu Geçiş Diyagramı",
      "type": "State Machine",
      "mermaid_code": "stateDiagram-v2\n    [*] --> YeniFirsat : Fırsat Oluştur\n    \n    YeniFirsat --> Nitelikli : Müşteri İletişimi Başarılı\n    YeniFirsat --> Reddedildi : Müşteri İlgisiz\n    \n    Nitelikli --> TeklifHazirlama : Teklif Hazırlama Kararı\n    Nitelikli --> Reddedildi : Uygun Değil\n    \n    TeklifHazirlama --> TeklifGonderildi : Teklif Tamamlandı\n    TeklifHazirlama --> YeniFirsat : Daha Fazla Bilgi Gerekli\n    \n    TeklifGonderildi --> Muzakere : Müşteri Geri Bildirim\n    TeklifGonderildi --> Kazanildi : Müşteri Onayladı\n    TeklifGonderildi --> Kaybedildi : Müşteri Reddetti\n    \n    Muzakere --> TeklifHazirlama : Teklif Revizyonu\n    Muzakere --> Kazanildi : Anlaşma Sağlandı\n    Muzakere --> Kaybedildi : Anlaşma Sağlanamadı\n    \n    Kazanildi --> [*]\n    Kaybedildi --> [*]\n    Reddedildi --> [*]\n    \n    state YeniFirsat {\n        [*] --> BilgiToplama\n        BilgiToplama --> DeğerlendirmeBekliyor\n        DeğerlendirmeBekliyor --> [*]\n    }\n    \n    state TeklifHazirlama {\n        [*] --> UrunSecimi\n        UrunSecimi --> FiyatHesaplama\n        FiyatHesaplama --> OnayBekliyor\n        OnayBekliyor --> PDFOlusturma\n        PDFOlusturma --> [*]\n    }"
    }
  ]
}
```