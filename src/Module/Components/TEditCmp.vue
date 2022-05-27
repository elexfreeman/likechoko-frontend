<template>
  <div class>
    <slot name="content" />
    <div class="t-edit-p text-right pb-4">
      <button :disabled="bIsLoad" type="button" class="btn btn-sm btn-success t-button" @click="fOk">Сохранить</button>
      <button class="btn btn-sm btn-outline-success t-button" @click="fCancel">Отмена</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Компонент редактирование - добавления
 */

@Component({
  name: 'TEditCmp',
  components: {},
})
export default class MainP extends Vue {
  // data

  // props
  @Prop({ required: true }) readonly sCaption: string;
  // маршрут в vue
  @Prop({ required: true }) readonly sRoute: string;

  @Prop({ required: true }) readonly fOk: () => void;
  @Prop({ required: true }) readonly fCancel: () => void;
  @Prop({ required: true }) readonly bIsLoad: boolean;

  // computed

  // methods
  async mounted() {}
}
</script>

<style lang="scss"></style>
