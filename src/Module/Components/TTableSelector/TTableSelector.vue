<template>
  <div class="t-selector">
    <div class="t-selector-input form-control" @click="fShowModal">
      <span>{{ fGetSelectedData }}</span>
      <i class="fas fa-caret-down" />
    </div>

    <TModal
      :f-on-close="
        () => {
          fHideModal();
        }
      "
      :s-title="sModalCaption"
      :s-size-class="fModalSize"
      :b-is-open="bShowModal"
    >
      <template #content>
        <List
          v-if="nModalRoute == 0"
          :table-loader="tableLoader"
          :f-select-field="fSelectField"
          :s-field="sField"
          :b-can-add="bCanAdd"
          :f-set-modal-route="fSetModalRoute"
        />

        <!-- Компонент доавления в модалке -->
        <div :style="fShowAddModal">
          <slot :f-on-add-handler="fOnAddHandler" name="add" />
        </div>
      </template>
    </TModal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TableLoader } from '../../Sys/TableLoader';
import TModal, { ModalSizeEnum } from '../Modal/TModal.vue';
import TTable from '../Table/TTable.vue';
import List from './List.vue';

@Component({
  name: 'TTableSelector',
  components: { TTable, TModal, List },
})
export default class TTableSelector extends Vue {
  // data
  private bShowModal = false;
  private selectedData: any = {};

  /**
   * Мрашрут модалки
   * 0 - list
   * 1 - add
   * 2 - edit
   */
  private nModalRoute: number = 0;

  // props

  // событие выбора
  @Prop({ required: true }) readonly fOnSelect: (data: any) => void;

  // загрузчик списка
  @Prop({ required: true }) readonly tableLoader: TableLoader;

  // поле для выбора
  @Prop({ required: true }) readonly sField: string;

  // Заголовок
  @Prop({ required: true }) readonly sModalCaption: string;

  // Для v-model
  @Prop({ required: false }) readonly value: number;

  // можно добавлять записи
  @Prop({ required: false, default: false }) readonly bCanAdd: boolean;

  // computed

  // methods
  async mounted() {
    this.tableLoader.listLoader.fAddColumn({
      label: '',
      field: 'select_button',
      sortable: false,
    });

    if (this.value) {
      const respData = await this.tableLoader.rowInfoLoader.faLoadInfo(this.value);
      if (respData.ok) {
        this.selectedData = respData.data.row;
      }
    }
  }

  fShowModal() {
    this.bShowModal = true;
    this.nModalRoute = 0;
  }

  fHideModal() {
    this.bShowModal = false;
    this.nModalRoute = 0;
  }

  fSelectField(data: any) {
    this.bShowModal = false;
    this.selectedData = data;
    this.fOnSelect(data);
    this.$emit('input', data.id);
  }

  fSetModalRoute(nModalRoute: number) {
    this.nModalRoute = nModalRoute;
  }

  /**
   * событие добавления строчки
   * вызывается как колбэк в слоте добавления
   * это важно
   */
  fOnAddHandler() {
    this.fSetModalRoute(0);
  }

  get fModalSize(): string {
    return ModalSizeEnum.lg;
  }

  // показать добавление
  get fShowAddModal(): Object {
    let resp = {};
    if (this.nModalRoute === 0) {
      resp = { display: 'none' };
    }

    return resp;
  }

  get fGetSelectedData(): string {
    if (this.selectedData && Object.keys(this.selectedData).length > 0) {
      return `${this.selectedData.id}: ${this.selectedData[this.sField]}`;
    }
    return '';
  }
}
</script>

<style lang="scss"></style>
