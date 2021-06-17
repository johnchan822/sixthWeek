export default {
  template: '#modal',
  data() {
    return {
      modal :'',
      tempProduct: {},
      qty:1,
    };
  },
  props:['product'],
  watch: {
    //注意這邊避免單向數據流
    product(){
      this.tempProduct = this.product;
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal)
  },
  methods: {
    openModal(){
      this.modal.show();
    },
    addCartModal(){
      this.$emit('emit-addCart',this.tempProduct.id)
    },
    closeModal(){
      this.modal.hide();
    }
  },

}
