<template>
  <input
    class="form-control"
    type="search"
    v-model="searchQuery"
    placeholder="Search"
    aria-label="Search"
    style="width: 500px"
  />
</template>

<script>
export default {
  name: "FrontendSearchBar",
  data() {
    return {
      searchQuery: null,
    };
  },
  watch: {
    searchQuery() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>
