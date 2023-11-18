<template>
  <v-dialog v-model="dialog" persistent max-width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="action === 'delete'"
        color="error"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ action | capitalize }}
      </v-btn>
      <v-btn
        v-if="action === 'post'"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ action | capitalize }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Are you sure you want to {{ action }} the {{ msg }} ?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green darken-1" text @click="dele"> Agree </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FrontendConfirmDelete",
  data() {
    return {
      dialog: false,
    };
  },
  filters: {
    capitalize: function (data) {
      var capitalized = [];
      data.split(" ").forEach((word) => {
        capitalized.push(
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      });
      return capitalized.join(" ");
    },
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    dele: function () {
      this.$emit("deleted");
      this.dialog = false;
    },
  },
};
</script>
