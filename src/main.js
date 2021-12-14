import CKEditor from 'ckeditor4-vue';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from "./router";
import store from './store';

Vue.use(Vuex)

Vue.use( CKEditor );

Vue.config.productionTip = false

new Vue({router,
  render: h => h(App),
  store,
}).$mount('#app')

// TODO: CSS BEM
// TODO:
