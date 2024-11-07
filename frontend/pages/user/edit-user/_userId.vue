<template>
    <div class="container my-3">
      <h2>Kullanıcıyı Düzenle</h2>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="name">Ad</label>
          <input v-model="user.name" type="text" class="form-control" id="name" required />
        </div>
        <div class="form-group">
          <label for="surname">Soyad</label>
          <input v-model="user.surname" type="text" class="form-control" id="surname" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="user.email" type="email" class="form-control" id="email" required />
        </div>
        <div class="form-group">
          <label for="role">Rol</label>
          <select v-model="user.roleId" class="form-control" id="role" required>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Düzenle</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: '',
          surname: '',
          email: '',
          roleId: null
        },
        roles: [] 
      };
    },
    async mounted() {
      const userId = this.$route.params.userId; 
      await this.fetchUser(userId);
      await this.fetchRoles(); 
    },
    methods: {
      async fetchUser(userId) {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get(`/api/v1/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = response.data.user;
        } catch (error) {
          console.error('Kullanıcı verisi alınırken hata oluştu:', error);
        }
      },
      async fetchRoles() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get('/api/v1/roles', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.roles = response.data.roles; 
        } catch (error) {
          console.error('Roller alınırken hata oluştu:', error);
        }
      },
      async updateUser() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.put(`/api/v1/users/${this.user.id}`, this.user, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            this.$router.push('/user/users'); 
            alert('Kullanıcı başarıyla güncellendi.');
          }
        } catch (error) {
          console.error('Kullanıcı güncellenirken hata oluştu:', error);
          alert('Kullanıcı güncellenirken bir hata oluştu.');
        }
      }
    }
  };
  </script>
  