<template>
<div class="container my-5">
    <div class="card shadow-sm p-4">
    <h1 class="text-center mb-4">Şifremi Değiştir</h1>
    <form @submit.prevent="change_password">
        <div class="mb-3">
        <label for="currentPassword" class="form-label">Mevcut Şifre:</label>
        <input type="password" id="currentPassword" v-model="currentPassword" class="form-control" required placeholder="Mevcut Şifrenizi Girin"/>
        </div>
        
        <div class="mb-3">
        <label for="newPassword" class="form-label">Yeni Şifre:</label>
        <input type="password" id="password" v-model="newPassword" class="form-control" required placeholder="Yeni Şifrenizi Girin"/>
        </div>
        <button type="submit" class="btn btn-primary w-100">Giriş Yap</button>
    </form>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
    currentPassword: '',
    newPassword: ''
    };
},
    methods: {
        async change_password() {
            try {
                const token = localStorage.getItem("token");
                const response = await this.$axios.post('/api/v1/change-password',{
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
               
                if(response.status === 200){
                    alert(response.data.message)
                }
                await this.$axios.get("/api/v1/logout");
                this.$store.commit('clearUser'); 
                this.$store.commit('clearToken'); 
                await this.$router.push('/auth/login'); 
            } catch (err) {
                if(err.response){
                    const status = err.response.status;
                    const data = err.response.data;
                    if(status === 401){
                        alert(data.message)
                    }else{
                        alert(`Hata:, ${data.message}`);
                    }
                }
                console.log(err);
                alert("Şifre değiştirme işlemi yapılırken hata oluştu!"); 
            }
        }
    }
};
</script>

<style scoped>

</style>
