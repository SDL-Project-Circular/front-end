<template>
  <v-snackbar v-model="snackbar">
    {{ error }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "FrontendErrorMessage",
  data() {
    return {
      snackbar: true,
    };
  },
  props: ["error"],
};
</script>
