<template>
  <TEditPage
    :b-is-load="bIsLoad"
    :f-ok="
      () => {
        fOk();
      }
    "
    :f-cancel="() => {}"
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
      />
    </template>
  </TEditPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { config } from '../../Config';
import { BaseModel } from '../Sys/BaseModel';

import TEdit from '../Components/Edit/TEdit.vue';
import { TableInfoLoader } from '../Sys/TableInfoLoader';
import TEditPage from '../Components/TEditPage.vue';
import { RowSaverS } from '../Sys/RowSaverS';
import { ErrorParseS } from '../Sys/ErrorParseS';

@Component({
  components: { TEdit, TEditPage },
})
export default class AddP extends Vue {
  // data
  private bIsLoad = false;
  private row: any = {};
  private sCaption = 'Add client';
  private sRoute = 'client';

  private errorParseS: ErrorParseS = new ErrorParseS({});
  // props

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
      this.$router.push('/' + this.sRoute);
    } else {
      this.errorParseS = new ErrorParseS(data.errors);
      console.error(this.errorParseS);
    }
  }
}
</script>

<style lang="scss"></style>
