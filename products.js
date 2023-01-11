import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


const app = {
    data(){
        return {
            products:{},
            temp:[],
            baseUrl: "https://vue3-course-api.hexschool.io",
            apiPath: "duej123456"
        }
    },

    methods: {
        checkAdmin(){
            axios
                .post(`${this.baseUrl}/v2/api/user/check`)
                .then(this.getProducts())
                .catch((error) => {
                    alert(error.data.message);
                    window.location = "login.html"
                })
        },

        getProducts(){
            axios
                .get(`${this.baseUrl}/v2/api/${this.apiPath}/admin/products/all`)
                .then(res => this.products = res.data.products)
                .catch(error => alert(error.response.data.message))
        },
    },

    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hedyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }
};

createApp(app).mount("#app");