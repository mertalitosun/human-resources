# İnsan Kaynakları Projesi

## Genel Bakış

İnsan Kaynakları projesi, bir organizasyonun dış kaynaklar aracılığıyla işçi alımını yönetmesini kolaylaştırır.

## Özellikler

- **Çalışan Yönetimi**: İşçi kayıtlarını ekleyin, güncelleyin ve silin.
- **Rol Yönetimi**: Kullanıcılara farklı roller atayın ve yönetin.
- **Kimlik Doğrulama**: İK yöneticileri, 3.parti firmalar ve admin kullanıcıları için güvenli giriş.
- **Kullanıcı İzinleri**: Uygulama özelliklerine farklı seviyelerde erişim sağlayan roller.
- **Evrak Yönetimi**: İşçi evrakları onaylanması, reddedilmesi ve reddeilme nedenlerini yönetin.

## Kullanılan Teknolojiler

- **Frontend**: HTML, CSS, JavaScript (nuxt.js)
- **Backend**: Node.js ve Express.js
- **Veritabanı**: MySQL
- **Kimlik Doğrulama**:JWT (JSON Web Tokens)
- **ORM**: Sequelize

## Kurulum


### Adımlar



1. Repositori klonlayın:
   ```bash
    git clone https://github.com/mertalitosun/human-resources.git
    cd human-resources
   ```

2. Backend klasörüne geçin:
    ```bash
    cd backend
   ```
3. Bağımlılıkları yükleyin:
    ```bash
        npm install
    ```
4. Ana dizininde bir .env dosyası oluşturun ve yapılandırın:
    ```bash
        DB_HOST=veritabanı-hostunuz
        DB_USER=veritabanı-kullanıcı-adınız
        DB_PASS=veritabanı-şifreniz
        DB=veritabanı-adınız
    ```
5. Sunucu başlatın:
    ```bash
        npm start
    ```
6. Yeni bir terminal açın ve Nuxt.js tarafındaki adımları izleyin:
    - ```bash
        cd ../frontend
        ``` 
    - ```bash
        npm install
        ``` 
    - ```bash
        npm run dev 
        ``` 
        veya

    - ```bash
        npm run build
        ``` 
## Kullanım
    1. Oluşturduğunuz ilk kayıt admin olarak olacaktır. Daha sonraki her bir kayıt 3. Parti Firma Kullanısı rolündedir.
    2. Admin yeni kullanıcı eklerken "Admin", "İnsan Kaynakları", "3. Parti Firma Kullanıcısı" rollerinden birini seçebilir.

## Veritabanı Yapısı

Proje, aşağıdaki temel veritabanı tablolarını kullanır:

- **Users**: Kullanıcı bilgilerini içerir (id, ad, email, şifre, rol vb.).
- **Roles**: Kullanıcı rollerinin tanımlarını içerir (Admin, İnsan Kaynakları, 3. Parti Firma Kullanıcısı vb. [name]).
- **Documents**: Kullanıcıların evraklarının bilgilerini içerir (evrak adı, durum, onaylanma tarihi vb.).
- **Workers**: İşçilerin bilgilerini içerir (id, ad, email, tc).

## Api Dökümantasyonu

- [Swagger Api Dökümantasyonu](http://localhost:8000/api-docs/).

## Postman Koleksiyonu

API endpointlerini test etmek ve projeyi daha iyi anlamak için [Postman koleksiyonunu buradan indirin](./postman/human-resources.postman_collection.json).