import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let deleteModal = null;

const app = {
    data(){
        return {
            baseUrl: "https://vue3-course-api.hexschool.io",
            apiPath: "duej123456",
            products:{},
            tempProduct:{
                imagesUrl:[],
            },
            isNew:""
        }
    },

    methods:{
        checkAdmin(){
            axios
                .post(`${this.baseUrl}/v2/api/user/check`)
                .then(res => this.getProduct())
                .catch(err => alert(error.data.message))
        },

        getProduct(){
            axios
                .get(`${this.baseUrl}/v2/api/${this.apiPath}/admin/products/all`)
                .then(res => this.products = res.data.products)
        },

        openModal(type,item){
            if(type === "new"){
                this.isNew = true;
                this.tempProduct = {imagesUrl:[]};
                productModal.show();
            }else if(type === "edit"){
                this.isNew = false;
                this.tempProduct = {...item}
                productModal.show();
            }else if(type === "delete"){
                this.tempProduct = {...item}
                deleteModal.show();
            }
        },

        updateProduct(){
            if(this.isNew){
                axios
                .post(`${this.baseUrl}/v2/api/${this.apiPath}/admin/product`, { data: this.tempProduct })
                .then(() => {
                    productModal.hide();
                    this.tempProduct = {imagesUrl:[]};
                    this.getProduct()
                })
                .catch(error => alert(error.data.message))
            }else{
                axios
                    .put(`${this.baseUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
                    .then(res => {
                        productModal.hide();
                        this.tempProduct = {imagesUrl:[]};
                        this.getProduct()
                    })
                    .catch(error => alert(error.data.message))
            }
        },

        deleteProduct(){
            axios
                .delete(`${this.baseUrl}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    deleteModal.hide();
                    this.tempProduct = {imagesUrl:[]};
                    this.getProduct()
                })
                .catch(error => alert(error.data.message))
        },

        addImg(){
            this.tempProduct.imagesUrl.push("")
        },

        deleteImg(){
            this.tempProduct.imagesUrl.pop()
        },
    },
    
    mounted(){
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        })
        deleteModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        })
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hedyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }
};

createApp(app).mount("#app");