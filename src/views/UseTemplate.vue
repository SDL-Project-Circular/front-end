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
        <v-form ref="form" lazy-validation @submit.prevent>
          <v-row>
            <v-col cols="4">
              <v-text-field
                name="circular_name"
                label="CircularName"
                required
                filled
                dense
                v-model="info.circular_name"
                :rules="simpleRules"
              ></v-text-field>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <FrontendDatePicker @dateAdd="handleDate" />
            </v-col>
          </v-row>
          <v-text-field
            name="ref"
            required
            label="Ref.no"
            v-model="info.ref_no"
            style="width: 25%"
            :rules="rules"
            outlined
          ></v-text-field>
          <div>
            <h5>FROM</h5>
            <v-textarea
              auto-grow
              class="address"
              name="from"
              v-model="info.from_address"
              outlined
              disabled
            ></v-textarea>
          </div>
          <div>
            <h5>TO</h5>
            <v-textarea
              auto-grow
              name="to"
              class="address"
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
          <v-row>
            <v-col cols="3" v-if="options.includes('occurrence_date')"
              ><FrontendDatePicker
                :rules="simpleRules"
                @dateAdd="handleDateBody"
                required
            /></v-col>
            <v-col cols="3" v-if="options.includes('venue')"
              ><v-text-field
                :rules="simpleRules"
                label="Venue"
                v-model="info.venue"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="3" v-if="options.includes('starting_time')"
              ><FrontendTimeRange
                :rules="simpleRules"
                :msg="'Starting Time'"
                @time="handleStartingDate"
                required
            /></v-col>
            <v-col cols="3" v-if="options.includes('ending_time')"
              ><FrontendTimeRange
                :rules="simpleRules"
                :msg="'Ending Time'"
                @time="handleEndingDate"
                required
            /></v-col>
          </v-row>
          <v-textarea
            auto-grow
            solo
            name="body"
            class="content"
            placeholder="Enter the letter body"
            v-model="info.body"
            disabled
          ></v-textarea>
          <h5 style="float: right; margin-right: 13%">SIGN OFF</h5>
          <h5>COPY TO</h5>
          <v-textarea
            auto-grow
            solo
            name="signoff"
            style="float: right; margin-right: 0.5%"
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
    <v-btn
      depressed
      color="primary"
      id="submit"
      type="button"
      class="btn btn-primary"
      @click="generate"
      style="margin-left: 45%; margin-bottom: 40px"
    >
      POST
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import FrontendDatePicker from "@/components/DatePicker.vue";
import FrontendTimeRange from "@/components/TimeRange.vue";
export default {
  name: "UseTemplate",
  components: { FrontendDatePicker, FrontendTimeRange },
  data() {
    return {
      info: {
        circular_name: "",
        from_address: "",
        to_address: "",
        subject: "",
        body: "",
        sign_off: "",
        copy_to: "",
        date: "",
        occurrence_date: null,
        venue: null,
        starting_time: null,
        ending_time: null,
      },
      simpleRules: [(value) => !!value || "Required!"],
      rules: [
        (value) => !!value || "Required!",
        () => this.checkRef() || "Reference ID already exists!",
      ],
      ref_info: [],
      options: [],
    };
  },
  created() {
    this.loader();
  },
  mounted() {
    this.handleDate();
    this.handleDateBody();
  },
  methods: {
    loader: async function () {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/generate?id=" + this.$route.query.id
        );
        // console.log(response.data);
        for (const i of Object.keys(response.data)) {
          if (response.data[i] !== true && response.data[i] !== false) {
            this.info[i] = response.data[i];
          } else if (response.data[i] === true) {
            console.log(i);
            this.options.push(i);
          }
        }
        const res = await axios.get("http://127.0.0.1:5000/circular");
        if (res.data.status !== "no") {
          this.ref_info = res.data;
          this.formatter;
        }
      } catch (error) {
        console.log(error);
      }
    },
    generate: async function () {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/circular",
          JSON.stringify(this.info),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.status === "success") {
          window.location = "/circular?id=" + res.data.circular_id;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleDate(dateAdd) {
      this.info.date = dateAdd;
    },
    handleStartingDate(start) {
      this.info.starting_time = start;
    },
    handleEndingDate(end) {
      this.info.ending_time = end;
    },
    handleDateBody(dateAdd) {
      if (dateAdd !== undefined) {
        this.info.occurrence_date = dateAdd;
      }
    },
    checkRef: function () {
      if (this.ref_info === null) {
        return true;
      }
      for (const i of this.ref_info) {
        if (i.ref_no === this.info.ref_no) {
          return false;
        }
      }
      return true;
    },
    formatter: function () {
      console.log(2);
      for (const i of Object.keys(this.info)) {
        this.info[i].replace(/\n/g, "<br>");
      }
    },
  },
};
</script>
