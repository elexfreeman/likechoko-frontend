<template>
  <TEditCmp
    :b-is-load="bIsLoad"
    :f-ok="() => fOk()"
    :f-cancel="() => fCancel()"
    :s-caption="sCaption"
    :s-route="sRoute"
  >
    <template #content>
      <div class="t-edit-p">
        <TEdit
          v-if="row"
          :error-parse-s="errorParseS"
          :s-route="sRoute"
          :c-table-info-loader="cTableInfoLoader"
          :row="row"
        />
      </div>
    </template>
  </TEditCmp>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import TEditCmp from '../Components/TEditCmp.vue';
import TEdit from '../Components/Edit/TEdit.vue';

import { config } from '../../Config';
import { BaseModel } from '../Sys/BaseModel';

import { TableInfoLoader } from '../Sys/TableInfoLoader';
import { RowSaverS } from '../Sys/RowSaverS';
import { ErrorParseS } from '../Sys/ErrorParseS';

@Component({
  components: { TEdit, TEditCmp },
})
export default class AddCmp extends Vue {
  // data
  private bIsLoad = false;
  private row: any = {};
  private sCaption = 'Add Inventory';
  private sRoute = 'inventory';

  private errorParseS: ErrorParseS = new ErrorParseS({});

  // props

  // нажата отмена
  @Prop({ required: true }) readonly fCancel: () => void;

  // колбэк добавления
  @Prop({ required: true }) readonly fOnAddClb: (id: number) => void;

  // computed

  get cTableInfoLoader(): TableInfoLoader {
    return new TableInfoLoader(this.sRoute, new BaseModel(config));
  }

  // methods
  async mounted() {}

  async fOk() {
    const rowSaverS = new RowSaverS(this.sRoute, new BaseModel(config));
    this.bIsLoad = true;
    const data = await rowSaverS.faAdd(this.row);
    this.bIsLoad = false;
    if (data.ok) {
      this.fOnAddClb(data.data.id);
    } else {
      this.errorParseS = new ErrorParseS(data.errors);
      console.error(this.errorParseS);
    }
  }
}
</script>

<style lang="scss"></style>
