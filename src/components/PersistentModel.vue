<template>
  <div id="app">
    <v-dialog
      persistent
      v-model="dialog"
      width="500"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="text-h4 grey lighten-2"
          >Circular Name</v-card-title
        >
        <v-card-text class="mt-4 pb-2">
          <v-text-field
            v-model="circular_name"
            label="Enter the circular name here"
            :rules="rules"
          ></v-text-field>
          <p style="color: red" class="m-0">
            {{ error }}
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end pt-0 pb-3">
          <v-btn type="submit" color="primary" text @click="tempName">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";
export default {
  data() {
    return {
      rules: [
        (value) => !!value || "Required!",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      circular_name: "",
      dialog: true,
      info: [],
      v: [],
      dummy: true,
      error: "",
    };
  },
  mounted() {
    this.loader();
  },
  methods: {
    loader: async function () {
      try {
        const response = await axios.get("http://127.0.0.1:5000/templates");
        console.log(response);
        this.info = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    tempName: function () {
      this.v = useVuelidate(this.rules, this.circular_name);
      let temp = true;
      for (let j = 0; j < this.rules.length; j++) {
        if (this.v[j].$response !== true) {
          temp = false;
          break;
        }
      }
      if (temp === true) {
        this.dummy = true;
        for (var j = 0; j < this.info.length; j++) {
          if (this.info[j].template_name === this.circular_name) {
            this.dummy = false;
            this.error = "Name already exists!";
            this.errorOccured();
            break;
          }
        }
        if (this.dummy === true) {
          this.$emit("circular_name", this.circular_name);
          this.dialog = false;
        }
      }
    },
    errorOccured: async function () {
      setTimeout(() => {
        this.error = "";
      }, 2000);
    },
  },
};
</script>
