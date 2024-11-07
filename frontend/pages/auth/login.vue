<template>
  <div class="container my-5">
    <div class="card shadow-sm p-4">
      <h1 class="text-center mb-4">Giriş Yap</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">E-posta:</label>
          <input type="email" id="email" v-model="email" class="form-control" required placeholder="E-posta adresinizi girin"/>
        </div>
        
        <div class="mb-3">
          <label for="password" class="form-label">Şifre:</label>
          <input type="password" id="password" v-model="password" class="form-control" required placeholder="Şifrenizi girin"/>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <button type="submit" class="btn btn-primary w-100 m-2">Giriş Yap</button>
          <a class="btn btn-warning w-100 m-2" href="/auth/forgot-password">Şifremi unuttum</a>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('/api/v1/login', {
          email: this.email,
          password: this.password
        });

        this.$store.commit('setUser', response.data.user);
        this.$store.commit('setToken', response.data.token);
        this.$router.push('/workers/workers'); 
      } catch (error) {
        console.error('Giriş hatası:', error);
        
        if(error.response){
          const status = error.response.status;
          const data = error.response.data
          if(status === 401){
            alert(data.message);
          }else if(status === 404){
            alert(data.message);
          }else if(status === 500){
            alert(data.message);
          }else{
            alert(`Hata: ${data.message}`);
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
