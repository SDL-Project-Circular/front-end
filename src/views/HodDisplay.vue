<template>
  <div class="circular container">
    <h1>POSTED CIRCULARS</h1>
    <SearchBar @search="handleSearch" />
    <br />
    <v-card
      elevation="20"
      class="mx-auto mb-4"
      max-width="600"
      outlined
      v-for="(i, index) in resultQuery.slice().reverse()"
      :key="i.ref_no"
    >
      <v-card-title
        ><router-link
          style="font-size: 110%"
          :to="{ name: 'CircularPreview', query: { id: i.ref_no } }"
        >
          {{ index + 1 }}. {{ i.circular_name | capitalize }}
        </router-link>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text
        class="text--primary font-weight-medium"
        style="font-size: 103%"
      >
        Ref.No : {{ i.ref_no }}
      </v-card-text>
      <v-card-text class="pt-0 pb-0">
        Posted on: {{ i.date | slice }}
      </v-card-text>
      <v-card-actions>
        <FrontendConfirmDelete
          :action="'delete'"
          :msg="'circular ' + i.circular_name"
          @deleted="HandleDelete(i.ref_no)"
        />
      </v-card-actions>
    </v-card>
    <ErrorMessage v-if="error.err" :error="error.message" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import FrontendConfirmDelete from "@/components/ConfirmDelete.vue";
export default {
  name: "HodDisplay",
  components: { SearchBar, FrontendConfirmDelete, ErrorMessage },
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

  methods: {
    HandleDelete: function (ref_no) {
      this.del(ref_no);
    },
    del: async function (ref_no) {
      try {
        const response = await axios.delete(
          "http://127.0.0.1:5000/circular?ref_no=" + ref_no
        );
        console.log(response);
        if (response.data.status == "success") {
          this.createCard();
          this.error.err = true;
          this.error.message = "Deleted successfully!";
          setTimeout(() => {
            this.error.err = false;
          }, 4000);
        } else {
          console.log(response.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    },
    createCard: async function () {
      try {
        const response = await axios.get("http://127.0.0.1:5000/circular", {
          headers: {
            "Authentication-Token": "",
          },
        });
        if (response.data.status == "no") {
          this.info = [];
        } else {
          this.info = response.data.filter((item) => item.approved === true);
          this.pending = response.data.filter(
            (item) => item.approved === false
          );
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
            .every((v) => item.circular_name.toLowerCase().includes(v));
        });
      } else {
        return this.info;
      }
    },
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
      console.log(date);
      var sliced = date.split(" ").slice(1, 4);
      return sliced.join(" ");
    },
  },
};
</script>
