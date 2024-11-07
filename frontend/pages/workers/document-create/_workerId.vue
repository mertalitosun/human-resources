<template>
    <div class="container">
      <h1>Belge Ekle</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="documents" class="form-label">Belgeler</label>
          <input type="file" class="form-control" id="documents" multiple @change="handleFileUpload" />
        </div>
        <button type="submit" class="btn btn-primary">Evrak Kaydet</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        documents: [],
        workerId: this.$route.params.workerId,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.documents = Array.from(event.target.files); 
      },
      async submitForm() {
        try {
          const token = localStorage.getItem('token'); 
          const workerId = this.$route.params.workerId; 
          const formData = new FormData();
       
          this.documents.forEach(file => {
            formData.append('document', file);
          });
  
          formData.append('workerId', this.workerId);
          
          const response = await this.$axios.post(`/api/v1/documents`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' 
            }
          });
  
          alert('Belgeler başarıyla eklendi!');
          this.$router.push(`/workers/worker-detail/${workerId}`); 
  
        } catch (error) {
          if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            if (status === 403) {
              alert(data.message);
            } else if (status === 404) {
              alert(data.message); 
            } else if (status === 500) {
              alert(data.message); 
            }
          }
          console.error('Belgeler eklenirken bir hata oluştu:', error);
          alert('Belgeler eklenirken bir hata oluştu.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  