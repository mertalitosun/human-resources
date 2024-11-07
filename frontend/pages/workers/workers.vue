<template>
    <div>
      <div class="container my-3">
        <h2>İşçiler</h2>
        <div class="d-flex align-items-center justify-content-end">
          <nuxt-link to="/workers/worker-create">Yeni işçi Ekle</nuxt-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>TC</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Email</th>
              <th>Ekleyen Kişi</th>
              <th>Evraklar</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="worker in workers" :key="worker.id">
              <td>{{ worker.identity_no }}</td>
              <td>{{ worker.name }}</td>
              <td>{{ worker.surname }}</td>
              <td>{{ worker.email }}</td>
              <td>{{ worker.AddedBy.name }}</td>
              <td>
                <nuxt-link :to="`/workers/worker-detail/${worker.id}`">Evraklar</nuxt-link>
              </td>
              <td>
                <nuxt-link :to="`/workers/edit-worker/${worker.id}`">Düzenle</nuxt-link>
              </td>
              <td>
               <button @click="confirmDelete(worker.id)" class="btn btn-danger">Sil</button>
              </td>
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
              <button type="button" class="btn btn-danger" @click="deleteWorker">Evet</button>
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
        workers: [],
        showModal: false,
        workerToDelete:null
      };
    },
    mounted() {
      this.fetchWorkers();
    },
    methods: {

      confirmDelete(workerId){
        this.workerToDelete = workerId;
        this.showModal = true;
      },

      closeModal(){
        this.showModal = false;
        this.workerToDelete = null;
      },
      async deleteWorker(){
        try{
          const token = localStorage.getItem("token");
          const response = await this.$axios.delete(`/api/v1/workers/${this.workerToDelete}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          });

          if(response.status === 200){
            this.workers = this.workers.filter(worker => worker.id !== this.workerToDelete);
            this.closeModal();
            alert("İşçi Başarıyla Silindi");
          }
        }catch(error){
          if(error.response){
            const status = error.response.status;
            const data = error.response.data;

            if(status === 403){
              alert(data.message);
            } else if(status === 404){
              alert(data.message);
            } else if(status === 500){
              alert(data.message);
            }else{
              alert("Hata:", data.message);
            }
          }
          console.log("İşçi silinirken hata oluştu!",error);
          alert("İşçi silinirken hata oluştu!")
        }
      },
      async fetchWorkers() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get('/api/v1/workers',{
            headers:{
                Authorization: `Bearer ${token}`,
            }
          });
          this.workers = response.data.workers;
        } catch (error) {
           if(error.response){
            const status = error.response.status;
            const data = error.response.data;
            if(status === 500){
              alert(data.message)
            }
           }
          console.error('Veri alınırken hata oluştu:', error);
          alert('Çalışan verileri alınırken bir hata oluştu.',error);
        }
      }
    }
  };
  </script>
  
<style scoped>
  .modal{
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
