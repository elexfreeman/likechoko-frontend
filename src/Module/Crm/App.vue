<template>
  <div class="crm">
    <div class="main-tpl">
      <div class="menu-tpl">
        <TopBaner />
        <LeftMenu />
      </div>
      <div class="content-tpl">
        <Menu />
        <router-view class="view" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainMenu from '../Menu/MainMenu.vue';
import TopBaner from '../Menu/TopBaner.vue';
import LeftMenu from '../Menu/LeftMenu.vue';

@Component({
  name: 'App',
  components: { MainMenu, TopBaner, LeftMenu },
})
export default class App extends Vue {
  // data

  // props

  // computed

  // methods
  async mounted() {}
}
</script>

<style lang="scss"></style>
