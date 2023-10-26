<template>
  <div>
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../src/components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>
