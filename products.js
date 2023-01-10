import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const baseUrl = "https://vue3-course-api.hexschool.io/";
const apiPath = "duej123456";


const app = {
    data(){
        return {
            token:"",
            products:{},
            temp:[]
        }
    },

    methods: {
        checkAdmin(){
            axios
                .post(`${baseUrl}/v2/api/user/check`)
                .then(this.getProducts())
                .catch((error) => {
                    alert(error.response.data.message);
                    window.location = "login.html"
                })
        },

        getProducts(){
            axios
                .get(`${baseUrl}/v2/api/${apiPath}/admin/products/all`)
                .then((res) =>{
                    this.products = res.data.products
                })
        },
    },

    mounted(){
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hedyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = this.token;
        this.checkAdmin();
    }
};

createApp(app).mount("#app");