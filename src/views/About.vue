<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div @click="test">
      子组件的子组件
    </div>
  </div>
</template>
<script>
export default {
  name: 'about',
  data() {
  return {};
  },
  methods:{
    test(){

    }
  },
  watch:{
    $route(to,from){
      console.log(to.path);
    }
  }
}
</script>