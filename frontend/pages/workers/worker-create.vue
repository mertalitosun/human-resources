<template>
    <div class="container">
      <h1>Yeni İşçi Ekle</h1>
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
          <label for="identity_no" class="form-label">TC Kimlik No</label>
          <input type="text" class="form-control" id="identity_no" v-model="form.identity_no" required />
        </div>
  
        <button type="submit" class="btn btn-primary">Yeni İşçi Kaydet</button>
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
          identity_no: ""
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.post('/api/v1/workers', this.form,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
          });
          alert('İşçi başarıyla eklendi!');
          this.$router.push('/workers/workers'); 
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
          console.error('İşçi eklenirken bir hata oluştu:', error);
          alert('İşçi eklenirken bir hata oluştu.',error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  