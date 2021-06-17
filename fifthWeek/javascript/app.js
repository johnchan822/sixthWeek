import productModal from './productModal.js';

const url = 'https://vue3-course-api.hexschool.io';
const path = 'johnhexschool';


//驗證
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

VeeValidateI18n.loadLocaleFromURL('zh_TW.json');
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});



const app = Vue.createApp({
  data() {
    return {
      //讀取效果!!避免一直按
      loadingStatus:'',
      products:[],
      product:{},
      carts:{ },
      user:{
        email:'',
        name:'',
        phone:'',
        adress:'',
        message:''
      }
    };
  },
  methods: {
    getData(){
      axios.get(`${url}/api/${path}/products`)
      .then((res)=>{
        console.log(res)
        this.products =res.data.products;
      })
    },
    //取得單一產品細節
    openModal(product){
      axios.get(`${url}/api/${path}/product/${product.id}`)
        .then((res) => {
          this.product = res.data.product;
          this.$refs.productModal.openModal();
        })
    },
    //加入購物車
    addCart(product, qty=1){
      this.loadingStatus = product.id;
      console.log(product)
      axios.post(`${url}/api/${path}/cart`, { "data": { "product_id": product.id ,"qty":qty }})
        .then((res) => {
          alert('已加入到購物車')
          this.$refs.productModal.closeModal();
          this.getCartData();
          this.loadingStatus ='';
        })
        .catch((err) => {
          console.log(err);
        })
    },
    //刷新購物車
    getCartData(){
      axios.get(`${url}/api/${path}/cart`)
        .then((res) => {
          console.log(res);
          this.carts =res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    //更新購物車數量內容
    updateCartData(cart){
      this.loadingStatus = cart.id;
      // console.log(cart.id,cart.qty)
      axios.put(`${url}/api/${path}/cart/${cart.id}`,
      {"data": { "product_id": cart.id, "qty": cart.qty }})
      .then((res)=>{
        this.getCartData();
        this.loadingStatus = '';
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    //刪除單筆資料
    delCartData(cart){
      this.loadingStatus =cart.id;
      axios.delete(`${url}/api/${path}/cart/${cart.id}`)
      .then((res)=>{
        this.getCartData();
        alert(res.data.message);
      })
    },
    //刪除全部資料
    delAllCartData(){
      axios.delete(`${url}/api/${path}/carts`)
        .then((res) => {
          this.getCartData();
          alert("已刪除所有購物車資料");
          this.loadingStatus ='';
        })
    },
    onSubmit(){
      axios.post(`${url}/api/${path}/order`, {
        "data": {
          "user": {
            "name": this.user.name,
            "email": this.user.email,
            "tel": this.user.phone,
            "address": this.user.address
          },
          "message": this.user.message
        }
      })
      .then((res)=>{
        alert(res.data.message)
        this.getCartData();
        this.$refs.form.resetForm();
      })
    }
  },
  mounted() {
    this.getData();
    this.getCartData();
  },
});





app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage)
app.component('userProductModal', productModal)
app.mount('#app');
