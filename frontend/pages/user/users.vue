<template>
    <div>
      <div class="container my-3">
        <h2>Kullanıcılar</h2>
        <div class="d-flex align-items-center justify-content-end">
          <nuxt-link to="/user/user-create" class="btn btn-outline-success">Yeni Kullanıcı Ekle</nuxt-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Email</th>
              <th>Rol</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
            
              <td>{{ user.name }}</td>
              <td>{{ user.surname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role.name }}</td>
              <td><nuxt-link :to="`/user/edit-user/${user.id}`" class="btn btn-info">Düzenle</nuxt-link></td>
              <td><button @click="confirmDelete(user.id)" class="btn btn-danger">Sil</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Emin misiniz?</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <p>Bu kullanıcıyı silmek istediğinizden emin misiniz?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Hayır</button>
              <button type="button" class="btn btn-danger" @click="deleteUser">Evet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        showModal: false,
        userToDelete: null,
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      //rol listeler
      async fetchUsers() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get('/api/v1/users',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
          });
          this.users = response.data.users;
        } catch (error) {
           if(error.response){
            const status = error.response.status;
            const data = error.response.data;
            if(status === 500){
                alert(data.message)
            }
           }
          console.error('Veri alınırken hata oluştu:', error);
          alert('Kullanıcı verileri alınırken bir hata oluştu.',error);
        }
      },

      //modal açar
      confirmDelete(userId) {
        this.userToDelete = userId;
        this.showModal = true;
      },

      // modal kapatır
      closeModal() {
        this.showModal = false;
        this.userToDelete = null;
      },

      //kullanıcı siler
      async deleteUser() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.delete(`/api/v1/users/${this.userToDelete}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            this.users = this.users.filter(user => user.id !== this.userToDelete);
            this.closeModal(); 
            alert('Kullanıcı başarıyla silindi.');
          }
        } catch (error) {
          if(error.response){
            const status = error.response.status;
            const data = error.response.data;

            if(status === 403){
              alert(data.message);
            } else if(status === 404){
              alert(data.message);
            } else if(status === 500){
              alert(data.message);
            } else{
              alert(`Hata: ${data.message}`);
            }
          }
          console.error('Kullanıcı silinirken hata oluştu:', error);
          alert('Kullanıcı silinirken bir hata oluştu.');
        }
      }
    }
  };
  </script>
  
<style scoped>
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
  