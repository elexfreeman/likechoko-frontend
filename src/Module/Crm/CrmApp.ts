import MainMenu from '../Menu/MainMenu.vue';
export default {
  name: 'CrmApp',
  data() {
    return {};
  }, // data
  props: {},
  mounted() {}, // mounted
  methods: {}, // methods
  computed: {
    isLogin() {
      return true;
    },
    onLoad() {
      return this.$store.onLoad;
    },
  }, // computed
  components: { MainMenu }, // components
};
