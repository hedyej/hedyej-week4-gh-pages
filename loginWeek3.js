import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
    data(){
        return {
            user:{
                username:"",
                password:""
            },
            baseUrl: "https://vue3-course-api.hexschool.io"
        }
    },

    methods:{
        userLogin(){
            axios.post(`${this.baseUrl}/v2/admin/signin`,this.user)
                .then(
                    res => {
                        const {token} = res.data;
                        document.cookie = `hedyToken = ${token};expires=${new Date(expired)}`;
                        window.location = 'products.html';
                    })
                .catch(error => alert(error.data.message))
        },
    }
};

createApp(app).mount("#app");