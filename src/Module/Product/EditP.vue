<template>
  <TEditPage
    :b-is-load="bIsLoad"
    :f-ok="
      () => {
        fOk();
      }
    "
    :f-cancel="
      () => {
        fCancel();
      }
    "
    :s-caption="sCaption"
    :s-route="sRoute"
  >
    <template #content>
      <TEdit
        v-if="row"
        :error-parse-s="errorParseS"
        :s-route="sRoute"
        :c-table-info-loader="cTableInfoLoader"
        :row="row"
      >
        <template #content>
          <div class="form-group">
            <label>Категория товара</label>
            <TTableSelector
              v-if="tableLoaderProductCategory"
              v-model="row.category_id"
              :b-can-edit="true"
              :b-can-add="true"
              :s-route="sProductCategoryR"
              :table-loader="tableLoaderProductCategory"
              :s-field="'caption'"
              :s-modal-caption="'Выбор категории товара'"
              :f-on-select="() => {}"
            >
              <template #add="props">
                <ProductCategoryAddCmp :f-on-add-clb="props.fOnAddHandler" :f-cancel="props.fOnAddCancelHandler" />
              </template>
            </TTableSelector>
          </div>
        </template>
      </TEdit>
    </template>
  </TEditPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductCategoryAddCmp from '../ProductCategory/AddCmp.vue';

import { config } from '../../Config';
import { BaseModel } from '../Sys/BaseModel';

import TEdit from '../Components/Edit/TEdit.vue';
import TTableSelector from '../Components/TTableDropdown/TTableDropdown.vue';

import { RowInfoLoader } from '../Sys/RowInfoLoader';
import { TableInfoLoader } from '../Sys/TableInfoLoader';
import TEditPage from '../Components/TEditPage.vue';
import { RowSaverS } from '../Sys/RowSaverS';
import { ErrorParseS } from '../Sys/ErrorParseS';
import { sRoute } from 'lc-common/lib/Routes/ProductR';
import { sRoute as sProductCategoryR } from 'lc-common/lib/Routes/ProductCategoryR';
import { TableLoader } from '../Sys/TableLoader';

@Component({
  components: { TEdit, TEditPage, TTableSelector, ProductCategoryAddCmp },
})
export default class EditP extends Vue {
  // data
  private bIsLoad = false;
  private row: any = {};
  private sCaption = 'Edit product';
  private sRoute = sRoute;
  private sProductCategoryR = sProductCategoryR;
  private errorParseS: ErrorParseS = new ErrorParseS({});
  private tableLoaderProductCategory: TableLoader = null;

  // props

  // computed

  get cTableInfoLoader(): TableInfoLoader {
    return new TableInfoLoader(this.sRoute, new BaseModel(config));
  }

  // methods
  async mounted() {
    this.errorParseS = new ErrorParseS({});
    const cRowLoader = new RowInfoLoader(this.sRoute, new BaseModel(config));
    this.row = (await cRowLoader.faLoadInfo(Number(this.$route.params.id))).data.row;

    const tableLoaderProductCategory = new TableLoader(this.sProductCategoryR, config);
    await tableLoaderProductCategory.listLoader.faInit();
    this.tableLoaderProductCategory = tableLoaderProductCategory;
  }

  /**
   * событие сохранения
   */
  async fOk() {
    const rowSaverS = new RowSaverS(this.sRoute, new BaseModel(config));
    this.bIsLoad = true;
    const data = await rowSaverS.faUpdate(this.row);
    this.bIsLoad = false;
    if (data.ok) {
      this.$router.push('/' + this.sRoute);
    } else {
      this.errorParseS = new ErrorParseS(data.errors);
    }
  }

  async fCancel() {
    this.$router.push({ path: '/' + this.sRoute });
  }

  fOnAddCategory(id: number) {
    return id;
  }
}
</script>

<style lang="scss"></style>
