<template>
  <div>
    <div class="container-fluid pt-4 page-content">
      <div class="slot-header d-flex justify-content-between align-items-center">
        <div class="header-caption">
          <div class="header-caption-item">
            {{ sCaption }}
          </div>
        </div>
        <slot name="header" />
      </div>
      <div class="">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Базовый компонент страницы
 */

@Component({
  name: 'TBasePage',
  components: {},
})
export default class MainP extends Vue {
  // data

  // props
  @Prop({ required: true }) readonly sCaption: string;

  // computed

  // methods
  async mounted() {}
}
</script>

<style lang="scss"></style>
