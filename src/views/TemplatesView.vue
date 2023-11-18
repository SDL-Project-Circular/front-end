<template>
  <div class="templates container">
    <SearchBar @search="handleSearch" />
    <h1 style="text-align: center" class="mb-4">Templates</h1>
    <v-card
      elevation="10"
      class="mx-auto mb-3"
      max-width="600"
      outlined
      v-for="(i, index) in resultQuery.slice().reverse()"
      :key="i.template_id"
    >
      <v-card-title
        ><router-link
          :to="{ name: 'UseTemplate', query: { id: i.template_id } }"
        >
          {{ index + 1 }}. {{ i.template_name | capitalize }}
        </router-link>
        <v-spacer></v-spacer>
        <v-card-actions>
          <FrontendConfirmDelete
            :action="'delete'"
            :msg="'template ' + i.template_name"
            @deleted="HandleDelete(i.template_id)"
          />
        </v-card-actions>
        <v-card-text class="pt-0 pb-0">
          Created on: {{ i.date | slice }}
        </v-card-text>
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
    <ErrorMessage v-if="error.err" :error="error.message" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import FrontendConfirmDelete from "@/components/ConfirmDelete.vue";
export default {
  name: "TemplatesView",
  components: { SearchBar, ErrorMessage, FrontendConfirmDelete },
  data() {
    return {
      searchQuery: null,
      info: [],
      error: {
        err: false,
        message: "",
      },
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
    slice: function (date) {
      if (date === null) {
        return;
      }
      var sliced = date.split(" ").slice(1, 4);
      return sliced.join(" ");
    },
  },
  methods: {
    HandleDelete: function (template_id) {
      this.deleteCard(template_id);
    },
    createCard: async function () {
      try {
        const response = await axios.get("http://127.0.0.1:5000/templates");
        if (response.data.status == "no") {
          this.info = [];
        } else {
          this.info = response.data;
        }
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          this.error.err = true;
          this.error.message = error.message;
          setTimeout(() => {
            this.error.err = false;
          }, 2000);
        }
      }
    },
    deleteCard: async function (template_id) {
      try {
        const response = await axios.delete(
          "http://127.0.0.1:5000/generate?id=" + template_id
        );
        if (response.data.status == "success") {
          this.createCard();
        } else {
          console.log(response.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSearch(search) {
      this.searchQuery = search;
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.info.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.template_name.toLowerCase().includes(v));
        });
      } else {
        return this.info;
      }
    },
  },
};
</script>
