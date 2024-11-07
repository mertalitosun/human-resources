<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Human Resources</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Ana Sayfa</a>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <a class="nav-link" href="/auth/login">Giriş Yap</a>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <a class="nav-link" href="/auth/register">Kayıt Ol</a>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a class="nav-link" href="/workers/workers">İşçiler</a>
          </li>
          <li v-if="isAuthenticated && (role === 'Admin')" class="nav-item">
            <a class="nav-link" href="/user/users">Kullanıcılar</a>
          </li>
          
          <li class="nav-item dropdown">
            <a v-if="user" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ user.name }}
            </a>
            <ul class="dropdown-menu">
              <li v-if="isAuthenticated" class="nav-item">
                <a class="nav-link" href="#" @click="logout">Çıkış Yap</a>
              </li>
            </ul>
          </li>

          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; 
    },
    role() {
      return this.$store.getters.getRole;
    },
    user(){
      return this.$store.getters.getUser;
    }
  },
  methods: {
    async logout() {
      try {
        const response = await this.$axios.get('/api/v1/logout');
        this.$store.commit('clearUser'); 
        this.$store.commit('clearToken'); 
        await this.$router.push('/auth/login'); 
      } catch (err) {
        console.log(err);
        alert("Çıkış işlemi yapılırken hata oluştu!"); 
      }
    }
  },
  mounted() {
    this.$store.dispatch('loadUserFromStorage');
  }
};
</script>

<style scoped>

</style>
