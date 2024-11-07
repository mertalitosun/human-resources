<template>
    <div class="container my-5">
      <div class="card shadow-sm p-4">
        <h1 class="text-center mb-4">Kayıt Ol</h1>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="name" class="form-label">Ad</label>
            <input type="text" id="name" v-model="name" class="form-control" required placeholder="Adınızı girin"/>
          </div>

          <div class="mb-3">
            <label for="surname" class="form-label">Soyad</label>
            <input type="text" id="surname" v-model="surname" class="form-control" required placeholder="Soyadınızı girin"/>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">E-posta:</label>
            <input type="email" id="email" v-model="email" class="form-control" required placeholder="E-posta adresinizi girin"/>
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Şifre:</label>
            <input type="password" id="password" v-model="password" class="form-control" required placeholder="Şifrenizi girin"/>
          </div>
          <button type="submit" class="btn btn-primary w-100">Kayıt Ol</button>
        </form>
      </div>
    </div>
  </template>
    
    <script>
    export default {
      data() {
        return {
          name: '',
          surname: '',
          email: '',
          password: ''
        };
      },
      methods: {
        async register() {
          try {
            const response = await this.$axios.post('/api/v1/register', {
              name: this.name,
              surname: this.surname,
              email: this.email,
              password: this.password
            });
    
            this.$router.push('/auth/login'); 
          } catch (error) {
            console.error('Kayıt hatası:', error);
            
            if(error.response){
              const status = error.response.status;
              const data = error.response.data
              if(status === 404){
                alert(data.message);
              }else if(status === 500){
                alert(data.message);
              }else{
                alert("Giriş sırasında bir hata oluştu");
              }
            }else{
              alert("Giriş sırasında bir hata oluştu");
            }
          }
        }
      }
    };
    </script>
    
    <style scoped>
   
    </style>
    