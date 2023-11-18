<template>
  <div class="circular mt-2 container">
    <h1 style="text-align: center">Pending</h1>
    <SearchBar
      style="display: block; margin-right: auto; margin-left: auto"
      @search="handleSearch"
    />
    <br />
    <v-card
      elevation="20"
      class="mx-auto mb-4"
      max-width="600"
      outlined
      v-for="(i, index) in pendingResultQuery.slice().reverse()"
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
        Sent on: {{ i.date | slice }}
      </v-card-text>
      <v-card-actions>
        <v-btn class="ma-2" color="primary" @click="approvePost(i.ref_no)">
          Accept
          <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
        </v-btn>
        <v-btn class="ma-2" color="error" @click="declinePost(i.ref_no)">
          Decline
          <v-icon end icon="mdi-cancel"></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
export default {
  name: "ApproveCircular",
  components: { SearchBar },
  data() {
    return {
      searchQuery: null,
      info: [],
      pending: [],
    };
  },

  mounted() {
    this.createCard();
  },

  methods: {
    handleSearch(search) {
      this.searchQuery = search;
    },
    createCard: async function () {
      try {
        const response = await axios.get("http://127.0.0.1:5000/circular", {
          headers: {
            "Authentication-Token": localStorage.getItem("auth-token"),
          },
        });
        if (response.data.status == "no") {
          this.info = [];
        } else {
          this.info = response.data.filter((item) => item.approved === true);
          this.pending = response.data.filter(
            (item) => item.approved === false && item.status === "Pending"
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    declinePost: async function (ref_no) {
      try {
        await axios.patch(
          "http://127.0.0.1:5000/approval?ref_no=" + ref_no,
          null,
          {
            headers: {
              "Authentication-Token": localStorage.getItem("auth-token"),
            },
          }
        );
        this.createCard();
      } catch (err) {
        console.log(err);
      }
    },
    approvePost: async function (ref_no) {
      try {
        await axios.patch("http://127.0.0.1:5000/approval?id=" + ref_no, null, {
          headers: {
            "Authentication-Token": localStorage.getItem("auth-token"),
          },
        });
        this.createCard();
      } catch (err) {
        console.log(err);
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
  computed: {
    pendingResultQuery() {
      if (this.searchQuery) {
        return this.pending.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.circular_name.toLowerCase().includes(v));
        });
      } else {
        return this.pending;
      }
    },
  },
};
</script>
