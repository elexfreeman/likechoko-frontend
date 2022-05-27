<template>
  <div class="login-page">
    <div class="login-page__title">
      {{ lang.Pages.LoginP.title }}
    </div>
    <div class="form-group">
      <label>{{ lang.Pages.LoginP.login }}</label>
      <input v-model="login" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label>{{ lang.Pages.LoginP.pass }}</label>
      <input v-model="pass" type="password" class="form-control" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { fGetLang } from '../../../lang';
import { ILang } from '../../../lang/LangI';

@Component({
  components: {},
})
export default class EditP extends Vue {
  // data
  private login: string = '';
  private pass: string = '';

  // props

  // computed

  get lang(): ILang {
    return fGetLang();
  }

  // methods
  async mounted() {}

  /**
   * событие сохранения
   */
  async fLogin() {}

  async fCancel() {
    this.$router.push({ path: '/' });
  }
}
</script>

<style lang="scss"></style>
