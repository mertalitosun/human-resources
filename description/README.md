# Kullanılan Yapay Zekalar
- ChatGPT

## Projede yapay zeka kullanılan alanlar

1. nodejs de multer ile eklediğim dosyayı nasıl silerim

```bash
   fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Dosya silinirken hata oluştu:', err);
        return res.status(500).send('Dosya silinemedi');
      }
      console.log('Dosya başarıyla silindi');
      res.send('Dosya yüklendi ve silindi');
    });
```

2. Aşağıdaki dosya izni hatasını nasıl çözerim diye sorum ve aldığım yanıtı kullandım.
```bash
Error: EACCES: permission denied, open '/Users/mertalitosun/Desktop/linova-teknoloji/human-resources/frontend/pages/login.vue'
```

Yanıt:

```bash
sudo chmod -R 755 /Users/mertalitosun/Desktop/linova-teknoloji/human-resources/frontend/pages
```
3. nuxt2 ile proje geliştirdim githuba puhslayacağım gitignore da neler olması lazım 

```bash
# Nuxt.js build files
.nuxt/
dist/

# Dependency directories
node_modules/

# Log files
npm-debug.log
yarn-debug.log
yarn-error.log

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# dotenv environment variables file
.env

# Nuxt-specific environment files
.nuxt-env/
```
Benim için gerekli olacak şekilde düzenledim

4. nuxtjs ile bana email ve şifre olan giriş formu yapar mısın?
```vue
<template>
  <div class="login-container">
    <h2>Giriş Yap</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          class="form-control"
          required
          placeholder="Email adresinizi girin"
        />
      </div>

      <div class="form-group">
        <label for="password">Şifre</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="form-control"
          required
          placeholder="Şifrenizi girin"
        />
      </div>

      <button type="submit" class="btn btn-primary">Giriş Yap</button>
    </form>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      // Basit doğrulama
      const predefinedEmail = 'user@example.com';  // Burada test için sabit bir email kullanıyoruz
      const predefinedPassword = 'password';      // Burada test için sabit bir şifre kullanıyoruz

      // Girilen verileri kontrol et
      if (this.email === predefinedEmail && this.password === predefinedPassword) {
        // Giriş başarılı
        alert('Başarıyla giriş yaptınız!');
        this.$router.push('/dashboard');  // Giriş başarılıysa yönlendirme
      } else {
        // Hatalı giriş
        this.errorMessage = 'Email veya şifre yanlış.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
}
</style>

```

Bana verdiği kodu ben kendi ihtiyacıma göre düzelttim

5. nuxt ve axios ile mutipart örneği yapar mısın 

```vue
<template>
  <div>
    <h1>Dosya Yükleme</h1>
    <form @submit.prevent="uploadFile">
      <input type="file" ref="fileInput" />
      <button type="submit">Yükle</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async uploadFile() {
      const fileInput = this.$refs.fileInput;
      if (!fileInput.files.length) {
        alert('Lütfen bir dosya seçin.');
        return;
      }

      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      try {
        const response = await this.$axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Dosya başarıyla yüklendi:', response.data);
      } catch (error) {
        console.error('Dosya yükleme hatası:', error);
      }
    },
  },
};
</script>
```

Aldığım yanıtı kendime göre düzenledim ve kodladım

6. nodemailer ile gmail örneği yap

```javascript
const nodemailer = require('nodemailer');

// Gmail üzerinden e-posta göndermek için bir transporter oluşturuyoruz.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',  // Buraya kendi Gmail adresinizi yazın
    pass: 'your-app-password',     // Buraya Gmail için oluşturduğunuz uygulama şifrenizi yazın
  },
});

// Mail içeriğini belirliyoruz
const mailOptions = {
  from: 'your-email@gmail.com',   // Gönderen e-posta adresi
  to: 'recipient-email@example.com', // Alıcı e-posta adresi
  subject: 'Test E-posta',         // E-posta konusu
  text: 'Bu bir test e-postasıdır.', // E-posta içeriği
  // html: '<h1>HTML formatında içerik</h1>' // Alternatif olarak HTML içeriği de gönderebilirsiniz
};

// E-posta gönderme işlemi
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Mail gönderilemedi: ' + error);
  }
  console.log('Mail başarıyla gönderildi: ' + info.response);
});
```

Bu yapıda değişiklikler yaptım kendi ihtiyaçlarıma göre fonksyion ekleyip dinamikleştirdim.

7. Dockerfile örneği verir misin? 

```bash
# Node.js'in resmi Docker imajını kullan
FROM node:14

# Çalışma dizinini belirle (içerideki dosyaların kopyalanacağı yer)
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını çalışma dizinine kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kalan uygulama dosyalarını çalışma dizinine kopyala
COPY . .

# Uygulamanın çalışacağı portu belirt (örneğin 3000)
EXPOSE 3000

# Uygulamayı başlatmak için komut
CMD ["node", "app.js"]
```

Bana verdiği dockerfile örneğini kullandım