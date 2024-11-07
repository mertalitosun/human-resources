<template>
    <div>
      <div class="container my-3">
        <h2>Belgeler</h2>
        <div v-if="documents.length === 0" class="alert alert-danger" role="alert">
          Kullanıcıya ait evrak bulunamadı
        </div>
        <div class="d-flex align-items-center justify-content-end">
          <nuxt-link :to="`/workers/document-create/${workerId}`">Evrak Ekle</nuxt-link>
        </div>
        
        <table class="table" v-if="documents.length > 0">
          <thead>
            <tr>
              <th>Dosya Adı</th>
              <th>Ekleyen Kişi</th>
              <th>Onaylayan</th>
              <th>Durum</th>
              <th>Durum Açıklaması</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="document in documents" :key="document.id">
              <td>{{ document.name }}</td>
              <td>{{ document.UploadedBy.name }}</td>
              <td>{{ document.ApprovedBy ? document.ApprovedBy.name : "-" }}</td>
              <td>{{ document.status == "approved" ? "Onaylandı" : document.status == "pending" ? "Bekliyor" : document.status == "rejected" ? "Reddedildi" : ""  }}</td>
              <td>{{ document.rejection_reason}}</td>
              <td v-if="(role === 'Admin' || role === 'İnsan Kaynakları')">
                <select name="status" id="status" class="form-select" @change="updateStatus(document.id, $event.target.value)">
                  <option v-for="status in statusOptions" :value="status" :selected="status === document.status">
                    {{ status === "approved" ? "Onaylandı" : status === "rejected" ? "Reddedildi" : "Bekliyor" }}
                  </option>
                </select>
              </td>
              <td><button @click="confirmDelete(document.id)" class="btn btn-danger">Sil</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- modal -->
      <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Emin misiniz?</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <p>Bu belgeyi silmek istediğinizden emin misiniz?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Hayır</button>
              <button type="button" class="btn btn-danger" @click="deleteDocument">Evet</button>
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
        documents: [],
        workerId : this.$route.params.workerId,
        showModal: false,
        userToDelete: null,
        statusOptions: ["pending","approved","rejected"]
      };
    },
    computed: {
      role() {
        return this.$store.getters.getRole;
      },
    },
    mounted() {
      this.fetchDocuments();
    },
    methods: {

      confirmDelete(documentId) {
        this.documentToDelete = documentId;
        this.showModal = true;
      },

      closeModal() {
        this.showModal = false;
        this.documentToDelete = null;
      },

      async fetchDocuments() {
        const workerId = this.$route.params.workerId;
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.get(`/api/v1/workers/${workerId}/documents`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
          });
          this.documents = response.data.documents;
        } catch (error) {
           if(error.response){
            const status = error.response.status;
            const data = error.response.data;
            if(status === 403){
              alert(data.message);
              this.$router.push(`/workers/workers`); 
            }else if(status === 404){
              alert(data.message);
              this.$router.push(`/workers/workers`); 
            }else if(status === 500){
              alert(data.message);
              this.$router.push(`/workers/workers`); 
            }else{
              alert("Hata:",data.message);
              this.$router.push(`/workers/workers`); 
            }
           }
          console.error('Veri alınırken hata oluştu:', error);
          alert('Çalışan verileri alınırken bir hata oluştu.',error);
        }
      },

      async deleteDocument() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$axios.delete(`/api/v1/documents/${this.documentToDelete}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            this.documents = this.documents.filter(document => document.id !== this.documentToDelete);
            this.closeModal(); 
            alert('Dosya başarıyla silindi.');
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
          console.error('Dosya silinirken hata oluştu:', error);
          alert('Dosya silinirken bir hata oluştu.');
        }
      },

      async updateStatus(documentId,newStatus){
        try{
          const token = localStorage.getItem("token");
          const response = await this.$axios.patch(`/api/v1/documents`,{
            documentId,
            status: newStatus 
          },{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(response.status === 200){
            const updatedDocument = this.documents.find(doc => doc.id === documentId);
            if(updatedDocument){
              updatedDocument.status = newStatus
              updatedDocument.rejection_reason = response.data.document.rejection_reason
            }      
            alert(response.data.message)
          }
        }catch(err){
          console.log("Döküman durumu güncellenirken hata oluştu!", err);
          alert("Döküman durumu güncellenirken hata oluştu!")
          if(err.response){
            const status = err.response.status;
            const data = err.response.data;
            if(status === 403){
              alert(data.message)
            }else if(status === 404){
              alert(data.message)
            }else if(status === 500){
              alert(data.message)
            }else{
              alert(data.message)
            }
          }
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
  