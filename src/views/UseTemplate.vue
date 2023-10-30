<template>
  <div>
    <div
      class="a4 container"
      style="width: 8.27in; border: 2px solid grey; margin: 0.09in auto"
    >
      <nav class="navbar">
        <div class="container">
          <span class="navbar-brand">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/2061px-Anna_University_Logo.svg.png"
              alt=""
              style="width: 100px; height: 100px"
            />
          </span>
          <b>
            <div
              class="navbar-brand"
              style="
                justify-content: center;
                text-align: center;
                margin: 0px 170px 0px 0px;
              "
            >
              <span>COLLEGE OF ENGINEERING GUINDY</span>
              <br />
              <span>ANNA UNIVERSITY, CHENNAI - 600025</span>
            </div>
          </b>
        </div>
      </nav>
      <hr style="margin: 0px" />
      <div class="container" style="margin-top: 10px">
        <v-row>
          <v-col cols="8"> </v-col>
          <v-col cols="4">
            <FrontendDatePicker @dateAdd="handleDate" />
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation @submit.prevent>
          <v-text-field
            name="ref"
            label="Ref.no"
            v-model="info.ref_no"
            style="width: 25%"
            outlined
          ></v-text-field>
          <div>
            <v-textarea
              auto-grow
              class="address"
              name="from"
              label="FROM"
              v-model="info.from_address"
              outlined
              disabled
            ></v-textarea>
          </div>
          <div>
            <v-textarea
              auto-grow
              name="to"
              class="address"
              label="TO"
              outlined
              v-model="info.to_address"
              disabled
            ></v-textarea>
          </div>
          <label style="font-size: 120%">Dear Sir/Madam,</label>
          <br />
          <br />
          <v-textarea
            solo
            auto-grow
            name="subject"
            class="content"
            placeholder="Enter Subject"
            style="width: 70%; margin-left: 10%"
            v-model="info.subject"
            rows="1"
            disabled
          ></v-textarea>
          <v-text-field v-if="info.venue" label="Venue"> </v-text-field>
          <v-textarea
            auto-grow
            solo
            name="body"
            class="content"
            placeholder="Enter the letter body"
            v-model="info.body"
            disabled
          ></v-textarea>
          <v-textarea
            auto-grow
            solo
            name="signoff"
            style="float: right; margin-right: 10px"
            placeholder="sign-off"
            v-model="info.sign_off"
            disabled
          ></v-textarea>
          <v-textarea
            auto-grow
            solo
            name="copyto"
            class="address"
            placeholder="Copy to"
            v-model="info.copy_to"
            disabled
          >
          </v-textarea>
        </v-form>
      </div>
      <br />
    </div>
    <PresistentModelVue @circular_name="handleChildData" />
    <v-btn
      depressed
      color="primary"
      @click="generate"
      id="submit"
      type="button"
      class="btn btn-primary"
      style="margin-left: 45%; margin-bottom: 40px"
    >
      Done
    </v-btn>
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
          "http://127.0.0.1:5000/generate?id=" + this.$route.query.id
        );
        console.log(response);
        this.info = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleChildData(data) {
      this.forms.template_name = data;
    },
    handleDate(dateAdd) {
      this.forms.date = dateAdd;
    },
  },
  mounted() {
    this.loader();
  },
};
</script>
