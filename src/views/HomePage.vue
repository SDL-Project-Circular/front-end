<template>
  <div class="circular container">
    <v-tabs
      v-model="tab"
      color="#673AB7
    "
      centered
    >
      <v-tab :value="1">Posted</v-tab>
      <v-tab :value="2"
        >Pending
        <v-badge
          v-if="pendingResultQuery.length > 0"
          :content="pendingResultQuery.length"
          color="error"
        ></v-badge
      ></v-tab>
    </v-tabs>
    <br />
    <v-window v-model="tab">
      <v-window-item>
        <SearchBar
          v-if="info.length > 0"
          @search="handleSearch1"
          style="display: block; margin-right: auto; margin-left: auto"
        />
        <br />
        <h2 style="text-align: center" v-if="info.length === 0">
          No posts yet!
        </h2>
        <v-card
          elevation="20"
          class="mx-auto mb-4"
          max-width="500"
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
          <v-card-actions class="ml-2 mt-2 mb-2">
            <FrontendConfirmDelete
              :action="'delete'"
              :msg="'circular ' + i.circular_name"
              @deleted="HandleDelete(i.ref_no)"
            />
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item>
        <SearchBar
          @search="handleSearch2"
          v-if="pending.length > 0"
          style="display: block; margin-right: auto; margin-left: auto"
        />
        <br />
        <h2 class="mt-4" style="text-align: center" v-if="pending.length === 0">
          No posts awaiting approval/action!
        </h2>
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
          <v-card-actions class="pb-0 pl-0 pt-0">
            <v-card-title> Status : </v-card-title>
            <v-btn
              v-if="i.status === 'Pending'"
              class="white--text"
              color="warning"
            >
              {{ i.status }}
            </v-btn>
            <v-btn
              v-if="i.status === 'Accepted'"
              class="white--text"
              color="#017C3B"
            >
              {{ i.status }}
            </v-btn>
            <v-btn
              v-if="i.status === 'Rejected'"
              class="white--text"
              color="#f03949"
            >
              {{ i.status }}
            </v-btn>
          </v-card-actions>
          <v-card-actions class="pt-0 pl-0 pt-0">
            <v-card-title v-if="i.status !== 'Pending'">
              Action :
            </v-card-title>
            <FrontendConfirmDelete
              :action="'post'"
              :msg="'circular ' + i.circular_name"
              v-if="i.status === 'Accepted'"
              @deleted="handlePost(i.ref_no)"
            >
              Post
            </FrontendConfirmDelete>
            <v-btn
              v-if="i.status === 'Rejected'"
              class="white--text mr-3"
              color="primary"
              @click="editButton(i.ref_no)"
            >
              Edit
            </v-btn>
            <FrontendConfirmDelete
              v-if="i.status === 'Rejected'"
              :action="'delete'"
              :msg="'circular ' + i.circular_name"
              @deleted="HandleDelete(i.ref_no)"
            />
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
    <ErrorMessage v-if="error.err" :error="error.message" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import FrontendConfirmDelete from "@/components/ConfirmDelete.vue";
export default {
  name: "CircularView",
  components: { SearchBar, ErrorMessage, FrontendConfirmDelete },
  data() {
    return {
      searchQuery1: null,
      tab: null,
      error: {
        err: false,
        message: "",
      },
      searchQuery2: null,
      info: [],
      pending: [],
    };
  },
  created() {
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
      // console.log(date);
      var sliced = date.split(" ").slice(1, 4);
      return sliced.join(" ");
    },
  },
  methods: {
    HandleDelete: function (ref_no) {
      this.del(ref_no);
    },
    handlePost: function (ref_no) {
      this.postCircular(ref_no);
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
            (item) => item.approved === false
          );
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.error.err = true;
          this.error.message = "You are not authorized!";
          setTimeout(() => {
            localStorage.removeItem("auth-token");
            localStorage.removeItem("role");
            window.location = "/";
          }, 1300);
        }
      }
    },
    postCircular: async function (ref_no) {
      try {
        const response = await axios.patch(
          "http://127.0.0.1:5000/circular?id=" + ref_no,
          null,
          {
            headers: {
              "Authentication-Token": localStorage.getItem("auth-token"),
            },
          }
        );
        console.log(response);
        this.error.err = true;
        this.error.message = "Posted successfully!";
        setTimeout(() => {
          this.error.err = false;
        }, 4000);
        this.createCard();
      } catch (err) {
        console.log(err);
      }
    },
    del: async function (ref_no) {
      try {
        const response = await axios.delete(
          "http://127.0.0.1:5000/circular?ref_no=" + ref_no,
          {
            headers: {
              "Authentication-Token": localStorage.getItem("auth-token"),
            },
          }
        );
        // console.log(response);
        if (response.data.status == "success") {
          this.error.err = true;
          this.error.message = "Deleted successfully!";
          setTimeout(() => {
            this.error.err = false;
          }, 4000);
          this.createCard();
        } else {
          console.log(response.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSearch1(search) {
      this.searchQuery1 = search;
    },
    handleSearch2(search) {
      this.searchQuery2 = search;
    },
    editButton: function (ref_no) {
      window.location = "/editcircular?ref_no=" + ref_no;
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery1) {
        return this.info.filter((item) => {
          return this.searchQuery1
            .toLowerCase()
            .split(" ")
            .every((v) => item.circular_name.toLowerCase().includes(v));
        });
      } else {
        return this.info;
      }
    },
    pendingResultQuery() {
      if (this.searchQuery2) {
        return this.pending.filter((item) => {
          return this.searchQuery2
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
