<template>
    <div class="container">
      <h1>Yeni Kullanıcı Ekle</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Ad</label>
          <input type="text" class="form-control" id="name" v-model="form.name" required />
        </div>
  
        <div class="mb-3">
          <label for="surname" class="form-label">Soyad</label>
          <input type="text" class="form-control" id="surname" v-model="form.surname" required />
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="form.email" required />
        </div>
  
        <div class="mb-3">
          <label for="roleId" class="form-label">Rol</label>
          <select class="form-select" v-model="form.roleId" required>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-primary">Yeni Kullanıcı Oluştur</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          surname: '',
          email: '',
          roleId: null
        },
        roles: [] 
      };
    },
    mounted() {
      this.fetchRoles();
    },
    methods: {
      
      async fetchRoles() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get('/api/v1/roles',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
          });
          this.roles = response.data.roles; 
        } catch (error) {
            if(error.response){
                const status = error.response.status;
                const data = error.response.data;
                if(status === 500){
                    alert(data.message)
                }
            }
          console.error('Roller alınırken bir hata oluştu:', error);
          alert('Roller alınırken bir hata oluştu.',error);
        }
      },
  
      async submitForm() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.post('/api/v1/users', this.form,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
          });
          alert('Kullanıcı başarıyla eklendi! Şifre mail ile gönderildi.');
          this.$router.push('/user/users'); 
        } catch (error) {
            if(error.response){
                const status = error.response.status;
                const data = error.response.data;
                if(status === 400){
                  alert(data.message)
                }else if(status === 500){
                  alert(data.message)
                }else{
                  alert(`Hata: ${data.message}`);
                }
            }
          console.error('Kullanıcı eklenirken bir hata oluştu:', error);
          alert('Kullanıcı eklenirken bir hata oluştu.',error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  