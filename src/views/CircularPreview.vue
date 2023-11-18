<template>
  <div>
    <div class="page" id="printArea">
      <nav class="navbar" style="display: inline">
        <div style="text-align: center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/2061px-Anna_University_Logo.svg.png"
            class="img-fluid"
            alt=""
            style="width: 100px; height: 100px"
          />
          <b>
            <div class="navbar-brand">
              <span>COLLEGE OF ENGINEERING GUINDY</span>
              <br />
              <span>ANNA UNIVERSITY, CHENNAI - 600025</span>
            </div>
          </b>
        </div>
      </nav>
      <hr style="margin: 0px" />
      <div class="container" style="margin-top: 10px">
        <h5>Date : {{ info.date }}</h5>
        <h5>Ref.no : {{ info.ref_no }}</h5>
        <br />
        <div>
          <h5>From</h5>
          <p class="format" style="margin-left: 40px; margin-top: 5px">
            {{ info.from_address }}
          </p>
        </div>
        <br />
        <div>
          <h5>To</h5>
          <p class="format" style="margin-left: 40px; margin-top: 5px">
            {{ info.to_address }}
          </p>
        </div>
        <h3 style="margin-top: 30px">Dear Sir/Madam,</h3>
        <h5 class="format" style="margin-left: 5%; display: inline-block">
          Subject :&nbsp;
        </h5>
        <h6 style="display: inline-block">{{ info.subject }}</h6>
        <p class="format" style="text-indent: 150pt; text-align: justify">
          {{ info.body }}
        </p>
        <h5 v-if="info.venue !== null">Venue : {{ info.venue }}</h5>
        <h5 v-if="info.occurrence_date !== null">
          Date : {{ info.occurrence_date }}
        </h5>
        <h5 v-if="info.starting_time !== null" style="display: inline-block">
          Time : {{ info.starting_time }}&nbsp;
        </h5>
        <h5 v-if="info.ending_time !== null" style="display: inline-block">
          - {{ info.ending_time }}
        </h5>
        <br />
        <p
          class="format"
          style="float: right; margin-right: 10%; margin-top: 10%"
        >
          {{ info.sign_off }} Signature
        </p>
        <br />
        <h3>Copy To:</h3>
        <p
          class="format"
          style="margin-left: 1%; margin-top: 5px; margin-bottom: 5%"
        >
          {{ info.copy_to }}
        </p>
      </div>
    </div>
    <br />
    <div class="container mb-4" style="text-align: center">
      <v-btn
        id="submit"
        class="btn btn-primary ma-2"
        style="margin-left: 45%"
        @click="printIt"
      >
        PRINT
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FrontendTemplatePreview",

  data() {
    return {
      info: [],
    };
  },
  methods: {
    loader: async function () {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/circular?id=" + this.$route.query.id,
          {
            headers: {
              "Authentication-Token": localStorage.getItem("auth-token"),
            },
          }
        );
        // console.log(response);
        this.info = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    printIt: function () {
      console.log(123);
      var page = document.getElementById("printArea").innerHTML;
      var original = document.body.innerHTML;
      document.body.innerHTML = page;
      window.print();
      document.body.innerHTML = original;
      location.reload();
    },
    checker: function () {
      if (localStorage.getItem("role") === "HOD") {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.loader();
  },
};
</script>
