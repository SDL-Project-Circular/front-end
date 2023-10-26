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
      <form id="myForm">
        <div class="container" style="margin-top: 10px">
          <label style="margin-left: 530px">Date : </label>
          <input name="date" type="date" v-model="forms.date" required />
          <br /><br />
          <label style="font-size: 120%">Ref.no </label>
          <input name="ref" type="text" v-model="forms.ref" required />
          <br />
          <br />
          <div>
            <label style="font-size: 120%">From</label>
            <br />
            <textarea
              name="from"
              style="margin-left: 40px"
              rows="7"
              cols="40"
              v-model="forms.from"
              required
            ></textarea>
          </div>
          <div>
            <label style="font-size: 120%">To</label>
            <br />
            <textarea
              name="to"
              style="margin-left: 40px"
              rows="7"
              cols="40"
              v-model="forms.to"
              required
            ></textarea>
          </div>
          <label style="font-size: 120%">Dear Sir/Madam,</label>
          <textarea
            name="subject"
            class="content"
            rows="4"
            cols="70"
            v-model="forms.subject"
            placeholder="Enter Subject"
            required
          ></textarea>
          <textarea
            name="body"
            class="content"
            placeholder="Enter the letter body"
            rows="10"
            cols="70"
            v-model="forms.body"
            required
          ></textarea>
          <br />
          <br />
          <textarea
            name="signoff"
            style="float: right; margin-right: 80px"
            rows="3"
            cols="20"
            v-model="forms.sign_off"
            placeholder="sign-off"
            required
          ></textarea>
          <br />
          <label style="font-size: 120%">Copy To:</label>
          <br />
          <textarea
            name="copyto"
            rows="6"
            cols="20"
            v-model="forms.copy_to"
            required
          ></textarea>
        </div>
        <br />
        <button
          @click="generate"
          id="submit"
          type="button"
          class="btn btn-primary"
          style="margin-left: 45%; margin-bottom: 40px"
        >
          Generate
        </button>
      </form>
    </div>
    <PresistentModelVue @circular_name="handleChildData" />
  </div>
</template>
<script>
import axios from "axios";
import PresistentModelVue from "@/components/PersistentModel.vue";
export default {
  components: { PresistentModelVue },
  data() {
    return {
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
      },
    };
  },
  mounted() {},

  methods: {
    generate: async function () {
      await axios
        .post("http://127.0.0.1:5000/generate", this.forms, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status === "Failed") {
            window.location = "/settings";
          } else if (res.data.status === "Success") {
            window.location = "/template?id=" + res.data.id;
            console.log(res.data.id);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          //Perform action in always
        });
    },
    handleChildData(data) {
      this.forms.template_name = data;
    },
  },
};
</script>
