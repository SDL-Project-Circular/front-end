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
          >Template Name</v-card-title
        >
        <v-card-text class="mt-4 pb-2">
          <v-form ref="form" lazy-validation @submit.prevent>
            <v-text-field
              v-model="circular_name"
              label="Enter the template name here"
              :rules="rules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end pt-0 pb-3">
          <v-btn type="button" color="primary" @click="clicker"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ErrorMessage v-if="error.err" :error="error.message" />
  </div>
</template>
<script>
import axios from "axios";
import ErrorMessage from "@/components/ErrorMessage.vue";
export default {
  components: { ErrorMessage },
  data() {
    return {
      rules: [
        (value) => !!value || "Required!",
        (value) => (value && value.length >= 3) || "Min 3 characters",
        () => this.tempName() || "Template name exists!",
      ],
      circular_name: "",
      dialog: true,
      error: {
        err: false,
        message: "",
      },
      info: [],
      v: [],
    };
  },
  mounted() {
    this.loader();
  },
  methods: {
    loader: async function () {
      try {
        const response = await axios.get("http://127.0.0.1:5000/templates");
        this.info = response.data;
      } catch (error) {
        this.error.err = true;
        this.error.message = error.message;
      }
    },
    clicker: function () {
      if (this.$refs.form.validate()) {
        this.$emit("circular_name", this.circular_name);
        this.dialog = false;
      }
    },
    tempName: function () {
      if (this.info.status === "no") {
        return true;
      }
      for (const i of this.info) {
        if (i.template_name === this.circular_name) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>
