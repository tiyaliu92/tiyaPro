<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    components: {
    },
    mounted() {
      //const vm = this;
      // vm.getBaseRem();
      // window.onresize = () => {
      //   vm.getBaseRem();
      // }
    },
    methods:{

    }
}
</script>
<style lang="less">
  *{
    margin:0;
    padding:0;
    font-family: "Microsoft YaHei";
  }
  body,html{
    width:100%;
    height:100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
</style>
