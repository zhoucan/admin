const install = (Vue) => { 
    const Bus = new Vue({ 
        methods: { 
            on (event, ...args) { 
                this.$on(event, ...args); 
            }, 
            emit (event, callback) { 
                this.$emit(event, callback); 
            }, 
            off (event, callback) { 
                this.$off(event, callback); 
            },
        } 
    }) 
    Vue.prototype.$bus = Bus; 
    console.log(Vue.prototype)
} 
export default install;
