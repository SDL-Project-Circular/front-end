<template>
  <div class="templates container">
    <h1 style="text-align: center" class="mb-4">Circulars</h1>
    <v-card
      elevation="2"
      class="mx-auto mb-3"
      max-width="600"
      v-for="(i, index) in info.slice().reverse()"
      :key="i.template_id"
    >
      <v-card-title
        ><router-link
          :to="{ name: 'TemplatePreview', query: { id: i.template_id } }"
        >
          {{ index + 1 }}. {{ i.template_name | capitalize }}
        </router-link>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            color="#FF5252"
            @click="deleteCard(i.template_id)"
            elevation="10"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card-title>
    </v-card>
    <router-link to="/newtemplate">
      <div class="position-fixed bottom-0 end-0 mx-3 mb-3">
        <v-btn fab x-large dark elevation="30" color="black">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </div>
    </router-link>
    <h1 v-if="info.length === 0" style="text-align: center">No content yet!</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TemplatesView",

  data() {
    return {
      info: [],
    };
  },
  mounted() {
    this.createCard();
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
  methods: {
    createCard: async function () {
      try {
        const response = await axios.get("http://127.0.0.1:5000/templates");
        console.log(response.data.status == "no");
        if (response.data.status == "no") {
          this.info = [];
        } else {
          this.info = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteCard: async function (template_id) {
      try {
        const response = await axios.delete(
          "http://127.0.0.1:5000/generate?id=" + template_id
        );
        if (response.data.status == "success") {
          this.createCard();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
