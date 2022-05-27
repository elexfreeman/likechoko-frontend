export const aMenu = [
  {
    name: 'home',
    caption: 'Home',
    url: '/',
  },
];

export default {
  name: 'MainMenu',
  data() {
    return {};
  }, // data
  props: {},
  mounted() {}, // mounted
  methods: {
    fToggle() {
      this.$store.commit('setMenuStoreIsShow', !this.$store.state.MenuStore.bIsShow);
    },
  }, // methods
  computed: {
    isLogin() {
      return true;
    },
    bIsLoad() {
      return this.$store.state.MenuStore.bIsLoad;
    },
    bIsShow() {
      return this.$store.state.MenuStore.bIsShow;
    },
    aMenu() {
      return aMenu;
    },
  }, // computed
  components: {}, // components
};
