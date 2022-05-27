<template>
  <TBasePage :s-caption="sCaption">
    <template #header>
      <slot name="header" />
      <div class="text-right">
        <router-link :to="`${sRoute}/add`" class="btn btn-primary"> <i class="fa fa-plus" /> Добавить </router-link>
      </div>
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </TBasePage>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TBasePage from './TBasePage.vue';

/**
 * Компонент страницы списка
 */

@Component({
  name: 'TListPage',
  components: { TBasePage },
})
export default class MainP extends Vue {
  // data

  // props
  @Prop({ required: true }) readonly sCaption: string;
  @Prop({ required: true }) readonly sRoute: string;

  // computed

  // methods
  async mounted() {}
}
</script>

<style lang="scss"></style>
