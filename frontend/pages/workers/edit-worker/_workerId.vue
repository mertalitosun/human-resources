<template>
    <div class="container my-3">
      <h2>İşçiyi Düzenle</h2>
      <form @submit.prevent="updateWorker">
        <div class="form-group">
          <label for="name">Ad</label>
          <input v-model="worker.name" type="text" class="form-control" id="name" required />
        </div>
        <div class="form-group">
          <label for="surname">Soyad</label>
          <input v-model="worker.surname" type="text" class="form-control" id="surname" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="worker.email" type="email" class="form-control" id="email" required />
        </div>
        <div class="form-group">
          <label for="identity_no">TC Kimlik No</label>
          <input v-model="worker.identity_no" type="text" class="form-control" id="identity_no" required />
        </div>
        <div class="my-3">
          <button type="submit" class="btn btn-primary">Düzenle</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        worker: {
          name: '',
          surname: '',
          email: '',
          identity_no: ""
        },
      };
    },
    async mounted() {
      const workerId = this.$route.params.workerId; 
      await this.fetchWorker(workerId);
    },
    methods: {
      async fetchWorker(workerId) {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get(`/api/v1/workers/${workerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.worker = response.data.worker;
        } catch (error) {
          console.error('İşçi verisi alınırken hata oluştu:', error);
        }
      },
      async updateWorker() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.put(`/api/v1/workers/${this.worker.id}`, this.worker, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            this.$router.push('/workers/workers'); 
            alert('İşçi başarıyla güncellendi.');
          }
        } catch (error) {
          if(error.response){
            const status = error.response.status;
            const data = error.response.data;
            if(status === 403){
              alert(data.message);
            }else if(status === 404){
              alert(data.message);
            }else if(status === 500){
              alert(data.message);
            }else{
              alert("Hata:",data.message);
            }
          }
          console.error('İşçi güncellenirken hata oluştu:', error);
          alert('İşçi güncellenirken bir hata oluştu.');
        }
      }
    }
  };
  </script>
  