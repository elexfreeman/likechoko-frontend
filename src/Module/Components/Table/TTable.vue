<template>
  <div v-if="cListLoader">
    <vue-good-table
      v-model:is-loading="isLoading"
      mode="remote"
      :total-rows="nTotalRecords"
      :pagination-options="paginationOptions"
      :columns="aColumn"
      :rows="aRow"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-column-filter="onColumnFilter"
      @on-per-page-change="onPerPageChange"
    >
      <template #table-row="props">
        <slot :table-data="props" />

        <div v-if="props.column.field == 'buttons'" class="d-flex justify-content-end">
          <router-link
            v-if="oEditBtn"
            :to="`/${sRoute}/edit/${props.formattedRow['id']}`"
            type="button"
            class="btn btn-light"
          >
            <i class="fa fa-edit" />
          </router-link>
          <a v-if="oDelBtn" type="button" class="btn btn-light">
            <i class="fa fa-trash" />
          </a>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SearchS } from 'lc-common/lib/Service/SearchS';
import { ListLoader } from '../../Sys/ListLoader';
import { RowI, ColumnI, PaginationOptionsI } from 'lc-common/lib/Interfaces/ListI';

export interface ServerParamsI {
  columnFilters: {};
  sort: {
    field: string;
    type: string;
  };
  page: number;
  perPage: number;
}

export interface BtnI {
  sToolTip?: string;
  sUrl: string;
}

@Component({
  name: 'TTable',
})
export default class TTable extends Vue {
  // data
  private serverParams: ServerParamsI = {
    columnFilters: {},
    sort: {
      field: '',
      type: '',
    },
    page: 1,
    perPage: 20,
  };

  private nTotalRecords = 0;
  private isLoading = false;

  private aRow: RowI = [];

  private bShowBtns = false;

  // props
  @Prop({ required: true }) readonly cListLoader: ListLoader;
  @Prop({ required: false }) readonly oEditBtn: BtnI;
  @Prop({ required: false }) readonly oDelBtn: BtnI;
  @Prop({ required: false }) readonly oAddBtn: BtnI;
  // маршрут в vue

  // computed

  // параметры пагинации
  get paginationOptions(): PaginationOptionsI {
    return this.cListLoader.fGetPaginationOptions();
  }

  get aColumn(): ColumnI[] {
    return this.cListLoader.fGetAColumn();
  }

  get sRoute(): string {
    return this.cListLoader.fGetUrl();
  }

  // methods

  async mounted() {
    // кнопки
    this.bShowBtns = Boolean(this.oEditBtn) || Boolean(this.oDelBtn);
    if (this.bShowBtns) {
      this.aColumn.push({
        label: '',
        field: 'buttons',
        sortable: false,
      });
    }

    this.faLoadItems();
  }

  updateParams(newProps) {
    this.serverParams = Object.assign({}, this.serverParams, newProps);
  }

  onPageChange(params) {
    this.updateParams({ page: params.currentPage });
    this.faLoadItems();
  }

  onPerPageChange(params) {
    this.updateParams({ perPage: params.currentPerPage });
    this.faLoadItems();
  }

  onSortChange(params) {
    this.updateParams({
      sort: params[0],
    });
    this.faLoadItems();
  }

  onColumnFilter(params) {
    this.updateParams(params);
    this.faLoadItems();
  }

  // load items is what brings back the rows from server
  async faLoadItems() {
    const searchS = new SearchS();
    searchS.fSetOffest((this.serverParams.page - 1) * this.serverParams.perPage);
    searchS.fSetLimit(this.serverParams.perPage);

    const resp = await this.cListLoader.faLoad(searchS);
    this.aRow = resp.list;
    this.nTotalRecords = resp.total;
  }

  components: {};
}
</script>
