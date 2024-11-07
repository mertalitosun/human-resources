<template>
<div class="container my-5">
    <div class="card shadow-sm p-4">
    <h1 class="text-center mb-4">Şifremi Değiştir</h1>
    <form @submit.prevent="forgot_password">
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-control" required placeholder="E-Posta Adresini Girin"/>
        </div>
        
        <button type="submit" class="btn btn-primary w-100">E-Posta Gönder</button>
    </form>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
    email: '',
    };
},
    methods: {
        async forgot_password() {
            try {
                const token = localStorage.getItem("token");
                const response = await this.$axios.post('/api/v1/forgot-password',{
                    email: this.email,
                });
                
                if(response.status === 200){
                    alert(response.data.message)
                }
                await this.$router.push('/auth/login'); 
            } catch (err) {
                if(err.response){
                    const status = err.response.status;
                    const data = err.response.data;
                    if(status === 404){
                        alert(data.message)
                    }else if(status === 500){
                        alert(data.message);
                    }else{
                        alert(`Hata: ${data.message}`)
                    }
                }
                console.log(err);
                alert("Şifremi unuttum işlemi yapılırken hata oluştu!"); 
            }
        }
    }
};
</script>

<style scoped>

</style>
