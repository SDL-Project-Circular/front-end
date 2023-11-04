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
        <p>Date : {{ info.date }}</p>
        <h5>Ref.no : {{ info.ref_no }}</h5>
        <br />
        <div>
          <h5>From</h5>
          <p
            class="format"
            style="margin-left: 40px; margin-top: 5px; margin-bottom: 60px"
          >
            {{ info.from_address }}
          </p>
        </div>
        <div>
          <h5>To</h5>
          <p
            class="format"
            style="margin-left: 40px; margin-top: 5px; margin-bottom: 60px"
          >
            {{ info.to_address }}
          </p>
        </div>
        <h3 style="margin-top: 30px">Dear Sir/Madam,</h3>
        <p class="format" style="margin-left: 5%">
          <b>Subject : </b>{{ info.subject }}
        </p>
        <p class="format" style="text-indent: 150pt; text-align: justify">
          {{ info.body }}
        </p>
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
    <button
      id="submit"
      class="btn btn-primary"
      style="margin-left: 45%; margin-bottom: 40px"
      @click="printIt"
    >
      PRINT
    </button>
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
          "http://127.0.0.1:5000/circular?id=" + this.$route.query.id
        );
        console.log(response);
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
  },
  mounted() {
    this.loader();
  },
};
</script>
