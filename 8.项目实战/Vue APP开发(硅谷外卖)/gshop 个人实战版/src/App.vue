<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide />
  </div>
</template>


<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["userInfo"])
  },
  mounted() {
    this.userInfo();
  },
  components: { FooterGuide }
};
</script>

<style lang='stylus'>
#app {
  height: 100%;
  overflow: hidden;
}
</style>
