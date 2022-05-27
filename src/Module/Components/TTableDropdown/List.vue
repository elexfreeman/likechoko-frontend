<template>
  <div>
    <div v-if="bCanAdd" class="pb-2 text-right btn-plus">
      <button class="btn btn-primary btn-sm" @click="() => fSetModalRoute(1)"><i class="fa fa-plus" /> Добавить</button>
    </div>
    <TTable :c-list-loader="tableLoader.listLoader" :o-edit-btn="null" :o-del-btn="null">
      <template #default="props">
        <div
          v-if="props.tableData.column.field == sField"
          class="t-selected-field text-primary"
          @click="fSelectField(props.tableData.formattedRow)"
        >
          {{ props.tableData.formattedRow[props.tableData.column.field] }}
        </div>
        <span v-else>{{ props.tableData.formattedRow[props.tableData.column.field] }}</span>
      </template>
    </TTable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TableLoader } from '../../Sys/TableLoader';
import TModal from '../Modal/TModal.vue';
import TTable from '../Table/TTable.vue';

@Component({
  name: 'TTableSelector',
  components: { TTable, TModal },
})
export default class List extends Vue {
  // data

  // props

  // загрузчик списка
  @Prop({ required: true }) readonly tableLoader: TableLoader;

  // поле для выбора
  @Prop({ required: true }) readonly sField: string;

  // можно добавлять записи
  @Prop({ required: false, default: false }) readonly bCanAdd: boolean;

  @Prop({ required: true }) readonly fSelectField: (data: any) => void;

  @Prop({ required: true }) readonly fSetModalRoute: (data: number) => void;

  // computed

  // methods
  async mounted() {}
}
</script>

<style lang="scss"></style>
