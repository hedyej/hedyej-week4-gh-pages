import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import Pagination from './pagination.js';
import ProductModal from './productModal.js';

let productModal = null;
let deleteModal = null;

const app = createApp(
    {
        data(){
            return {
                baseUrl: "https://vue3-course-api.hexschool.io",
                apiPath: "duej123456",
                products:[],
                tempProduct:{
                    imagesUrl:[],
                },
                isNew:"",
                pages:{}
            }
        },
    
        methods:{
            checkAdmin(){
                axios
                    .post(`${this.baseUrl}/v2/api/user/check`)
                    .then(res => this.getProduct())
                    .catch(err => alert(err.data.message))
            },
    
            getProduct(page = 1){
                axios
                    .get(`${this.baseUrl}/v2/api/${this.apiPath}/admin/products?page=${page}`)
                    .then(res => {
                        this.pages = res.data.pagination;
                        this.products = res.data.products;
                    })
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
                    if(!this.tempProduct.imagesUrl){this.tempProduct.imagesUrl = []}
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
                    .catch(() => alert(error.data.message))
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
    }
)

app.component('Pagination',Pagination)
app.component('ProductModal',ProductModal)

app.mount("#app");