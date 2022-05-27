<template>
  <div v-if="!bIsLoad">
    <div v-for="(column, key) in cTableInfoLoader.aColumn" :key="key">
      <div class="form-group">
        <label v-if="column.sName != 'id'">{{ column.sCaption }}</label>
        <input
          v-if="column.nType == ColumnTypeEnumInteger && column.sName != 'id'"
          v-model="row[column.sName]"
          :disabled="column.sName == 'id'"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errorParseS.fIsError(column.sName) }"
        />
        <input
          v-if="column.nType == ColumnTypeEnumString"
          v-model="row[column.sName]"
          :disabled="column.sName == 'id'"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errorParseS.fIsError(column.sName) }"
        />
        <textarea
          v-if="column.nType == ColumnTypeEnumText"
          v-model="row[column.sName]"
          :class="{ 'is-invalid': errorParseS.fIsError(column.sName) }"
          :disabled="column.sName == 'id'"
          rows="4"
          type="text"
          class="form-control"
        />
      </div>
    </div>
    <slot name="content" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as TableI from 'lc-common/lib/Interfaces/TableI';
import { TableInfoLoader } from '../../Sys/TableInfoLoader';
import { ErrorParseS } from '../../Sys/ErrorParseS';

@Component({
  name: 'TEdit',
})
export default class TEdit extends Vue {
  // data
  private bIsLoad = true;

  // props
  // Загрзчик таблицы
  @Prop({ required: true }) readonly cTableInfoLoader: TableInfoLoader;
  // Строка с данными
  @Prop({ required: true }) readonly row: any;
  // маршрут в vue
  @Prop({ required: true }) readonly sRoute: string;
  // ошибки
  @Prop({ required: true }) readonly errorParseS: ErrorParseS;

  get ColumnTypeEnumText(): number {
    return TableI.ColumnTypeEnum.Text;
  }

  get ColumnTypeEnumString(): number {
    return TableI.ColumnTypeEnum.String;
  }

  get ColumnTypeEnumInteger(): number {
    return TableI.ColumnTypeEnum.Integer;
  }

  // methods

  async mounted() {
    await this.cTableInfoLoader.faLoadInfo();
    this.bIsLoad = false;
  }

  components: {};
}
</script>
