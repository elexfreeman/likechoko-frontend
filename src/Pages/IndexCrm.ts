import Vue from 'vue';
import VueRouter from 'vue-router';
import Crm from '../Module/Crm/App.vue';
import { store } from '../store';
import { router } from '../Module/Crm/router';

import VueGoodTablePlugin from 'vue-good-table';
// import the styles

Vue.use(VueGoodTablePlugin);
async function faMain() {
  // eslint-disable-next-line
  let app = document.getElementById('app');
  if (app) {
    Vue.use(VueRouter);

    /* верхний компонент */
    new Vue({
      router,
      store,

      /*  mode: 'history', */
      components: {},
      computed: {},
      beforeCreate() {},
      mounted() {},
      render: (h) => h(Crm),
    }).$mount('#app');
  }
}

// eslint-disable-next-line
document.addEventListener('DOMContentLoaded', faMain);
