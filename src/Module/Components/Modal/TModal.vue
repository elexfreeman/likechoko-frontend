<template>
  <div class="t-modal" :class="{ 'is-open': bIsOpen, 'start-close': bOnStartClose }">
    <div class="t-modal-bg" />
    <div class="t-modal-scroll">
      <div class="modal" tabindex="-1">
        <div :class="fGetModalSize" class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ sTitle }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="fOnModalClose">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <slot name="content" />
            </div>

            <div class="modal-footer">
              <slot name="buttons" />
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="fOnModalClose">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

/* eslint-disable */
export enum ModalSizeEnum {
  sm = 'modal-sm',
  default = '',
  lg = 'modal-lg',
  xl = 'modal-xl',
}
/* eslint-enable */

@Component({
  name: 'TModal',
  components: {},
})
export default class MainP extends Vue {
  // data
  private bOnStartClose = false;

  // props

  // Заголовок
  @Prop({ required: true }) readonly sTitle: string;
  // событие закакрытия
  @Prop({ required: true }) readonly fOnClose: () => void;
  // признак открытия
  @Prop({ required: false }) readonly bIsOpen: boolean;
  // размер
  @Prop({ required: false }) readonly sSizeClass: ModalSizeEnum;

  // computed

  get fGetModalSize(): Object {
    const resp = {};
    if (this.sSizeClass) {
      resp[this.sSizeClass] = true;
    }
    return resp;
  }

  // methods
  async mounted() {}

  fOnModalClose() {
    this.bOnStartClose = true;
    setTimeout(() => {
      this.fOnClose();
      this.bOnStartClose = false;
    }, 100);
  }

  // для скрола страницы
  @Watch('bIsOpen') fIsOpenChanged(val: boolean) {
    const body = document.getElementById('body');
    if (val) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
  }
}
</script>

<style lang="scss"></style>
