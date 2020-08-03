new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        products: '',
        productName: '',
        productPrice: '',
        dialogAdd: false,
        dialogEdit: false,
        dialogDelete: false,
        productIdEdit: '',
        productNameEdit: '',
        productPriceEdit: '',
        productIdDelete: '',
        productNameDelete: ''
    },
    created: function () {
        this.getProducts()
    },
    methods: {

        // Get Product
        getProducts: function () {
            axios.get('http://localhost:8080/products')
                .then(res => {
                    this.products = res.data;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        },

        // Create New product
        saveProduct: function () {
            axios.post('http://localhost:8080/products', {
                    product_name: this.productName,
                    product_price: this.productPrice
                })
                .then(res => {
                    // handle success
                    this.getProducts();
                    this.productName = '';
                    this.productPrice = '';
                    this.dialogAdd = false;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        },

        // Get Edit and Show data to Modal
        getEdit: function (product) {
            this.dialogEdit = true;
            this.productIdEdit = product.product_id;
            this.productNameEdit = product.product_name;
            this.productPriceEdit = product.product_price;
        },

        // Get Delete and Show Confirm Modal
        getDelete: function (product) {
            this.dialogDelete = true;
            this.productIdDelete = product.product_id;
            this.productNameDelete = product.product_name;
        },

        // Update Product
        updateProduct: function () {
            axios.put(`http://localhost:8080/products/${this.productIdEdit}`, {
                    product_name: this.productNameEdit,
                    product_price: this.productPriceEdit
                })
                .then(res => {
                    // handle success
                    this.getProducts();
                    this.dialogEdit = false;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        },

        // Delete Product
        deleteProduct: function () {
            axios.delete(`http://localhost:8080/products/${this.productIdDelete}`)
                .then(res => {
                    // handle success
                    this.getProducts();
                    this.dialogDelete = false;
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                })
        }
    }
})