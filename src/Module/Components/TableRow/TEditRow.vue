<template>
  <div class="t-edit-row">
    <div class="text-right pb-3">
      <button class="btn btn-primary btn-sm" @click="() => fOnAddhandler()"><i class="fa fa-plus" /> Добавить</button>
    </div>
    <slot
      v-for="(row, key) in aRow"
      :key="key"
      :f-on-remove-handler="fOnRemoveHandler"
      :row="row"
      :idx="key"
      name="rowSlot"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * Компонент табличная часть документа
 * например для заполения строк инвентариации склада
 * товар - кол-во - цена
 * товар - кол-во - цена
 * товар - кол-во - цена
 *
 * Входные параметры
 * sRoute - маршрут основного документа
 * sRouteDoc - маршрут табичной части
 */

@Component({
  name: 'TEditRow',
  components: {},
})
export default class TEditRow extends Vue {
  // data
  private aRow: any[]; // массив строк

  // props
  // маршрут в vue
  @Prop({ required: true }) readonly sRoute: string;
  // маршрут таблицы строк документа
  @Prop({ required: true }) readonly sRouteDoc: string;

  // id документа
  @Prop({ required: true }) readonly docId: number;

  // computed
  // признак существования слота строки
  get bHasRowSlot(): boolean {
    return !!this.$slots.rowSlot;
  }

  // methods
  async mounted() {}

  /**
   * удалить строку по idx
   */
  fOnRemoveHandler(idx: number) {
    delete this.aRow[idx];
  }

  fOnAddhandler() {
    this.aRow.push({});
  }
}
</script>

<style lang="scss"></style>
