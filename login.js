import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const baseUrl = "https://vue3-course-api.hexschool.io/";

const app = {
    data(){
        return {
            user:{
                username:"",
                password:""
            },
        }
    },

    methods:{
        userLogin(){
            axios.post(`${baseUrl}/v2/admin/signin`,this.user)
                .then(
                    res => {
                        const {token} = res.data;
                        document.cookie = `hedyToken = ${token}`;
                        window.location = 'products.html';
                    })
                .catch(
                    error => alert(error.response.data.message)
                )
        },
    }
};

createApp(app).mount("#app");