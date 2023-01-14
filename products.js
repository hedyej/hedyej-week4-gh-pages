import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
let myModal = new bootstrap.Modal(document.getElementById('productModal'), {
    keyboard: false
})

const app = {
    data(){
        return {
            baseUrl: "https://vue3-course-api.hexschool.io",
            apiPath: "duej123456",
            products:{},
            tempProduct:{
                imagesUrl:[],
            }
        }
    },

    methods:{
        checkAdmin(){
            axios
                .post(`${this.baseUrl}/v2/api/user/check`)
                .then(res => this.getProduct())
                .catch(err => alert(err))
        },

        getProduct(){
            axios
                .get(`${this.baseUrl}/v2/api/${this.apiPath}/admin/products/all`)
                .then(res => this.products = res.data.products)
        },

        createProduct(){
            myModal.show();
        },

        postProduct(){
            console.log("post")
            axios
                .post(`${this.baseUrl}/v2/api/${apiPath}/admin/product`)
                .then(res => console.log(res))
                .catch(res => console.log(res))
        }
    },
    
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }
};

createApp(app).mount("#app");