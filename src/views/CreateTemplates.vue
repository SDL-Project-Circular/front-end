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
            v-model="forms.ref"
            style="width: 25%"
            :rules="rules"
            outlined
          ></v-text-field>
          <div>
            <v-textarea
              auto-grow
              solo
              class="address"
              name="from"
              label="FROM"
              v-model="forms.from"
              :rules="rules"
            ></v-textarea>
          </div>
          <div>
            <v-textarea
              auto-grow
              solo
              name="to"
              class="address"
              v-model="forms.to"
              label="TO"
              :rules="rules"
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
            v-model="forms.subject"
            placeholder="Enter Subject"
            :rules="rules"
            style="width: 70%; margin-left: 10%"
            rows="1"
          ></v-textarea>
          <v-select
            style="width: 40%"
            clearable
            v-model="selected"
            :rules="rules"
            chips
            label="Data"
            :items="Object.keys(options)"
            multiple
            variant="solo"
          ></v-select>
          <v-textarea
            auto-grow
            solo
            name="body"
            class="content"
            placeholder="Enter the letter body"
            v-model="forms.body"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            auto-grow
            solo
            name="signoff"
            style="float: right; margin-right: 10px"
            v-model="forms.sign_off"
            placeholder="sign-off"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            auto-grow
            solo
            name="copyto"
            class="address"
            v-model="forms.copy_to"
            placeholder="Copy to"
            :rules="rules"
          ></v-textarea>
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
      Generate
    </v-btn>
  </div>
</template>
<script>
import axios from "axios";
import PresistentModelVue from "@/components/PersistentModel.vue";
import FrontendDatePicker from "@/components/DatePicker.vue";
export default {
  components: { PresistentModelVue, FrontendDatePicker },
  data() {
    return {
      rules: [(value) => !!value || "Required!"],
      forms: {
        date: "",
        ref: "",
        from: "",
        to: "",
        subject: "",
        body: "",
        sign_off: "",
        copy_to: "",
        template_name: "",
        selectedOptions: {},
      },
      selected: [],
      options: {
        Date: "occurence_date",
        Venue: "venue",
        StartingDate: "starting_time",
        Endingdate: "ending_time",
      },
    };
  },
  mounted() {
    this.initialFalseSetter();
  },

  methods: {
    generate: async function () {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/generate",
          this.forms,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        if (res.data.status === "failed") {
          window.location = "/settings";
        } else if (res.data.status === "success") {
          window.location = "/template?id=" + res.data.id;
        }
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
    initialFalseSetter: function () {
      for (const key in this.options) {
        this.forms.selectedOptions[this.options[key]] = false;
      }
    },
  },
  watch: {
    selected() {
      this.forms.selectedOptions = {};
      this.initialFalseSetter();
      this.selected.forEach((option) => {
        this.forms.selectedOptions[this.options[option]] = true;
      });
    },
  },
};
</script>
