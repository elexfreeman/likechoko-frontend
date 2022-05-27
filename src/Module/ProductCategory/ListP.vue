<template>
  <TListPage :s-caption="'Категории товаров'" :s-route="sRoute">
    <template #content>
      <TTable
        v-if="cListLoader"
        :c-list-loader="cListLoader"
        :s-route="sRoute"
        :o-edit-btn="{ sRoute: '' }"
        :o-del-btn="{ sRoute: '' }"
      >
        <template #default="props">
          <span>{{ props.tableData.formattedRow[props.tableData.column.field] }}</span>
        </template>
      </TTable>
    </template>
  </TListPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TTable from '../Components/Table/TTable.vue';
import { ListLoader } from '../Sys/ListLoader';

import { config } from '../../Config';
import { BaseModel } from '../Sys/BaseModel';

import { TableInfoLoader } from '../Sys/TableInfoLoader';
import TListPage from '../Components/TListPage.vue';
@Component({
  name: 'ListP',
  components: { TTable, TListPage },
})
export default class MainP extends Vue {
  // data
  private serverParams = {};
  private totalRecords = 10;
  private sRoute = 'productCategory';
  private cListLoader: ListLoader = null;
  // props

  get cTableInfoLoader(): TableInfoLoader {
    return new TableInfoLoader(this.sRoute, new BaseModel(config));
  }

  // methods
  async mounted() {
    const list = new ListLoader(this.sRoute, new BaseModel(config));
    await list.faInit();
    this.cListLoader = list;
  }
}
</script>

<style lang="scss"></style>
