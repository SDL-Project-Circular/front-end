<template>
  <div>
    <v-row>
      <v-col>
        <v-card style="margin-top: 37%; width: 70%; margin-left: 15%">
          <v-card-title
            style="margin-left: 37%; font-size: 250%; padding-top: 7%"
            >LOGIN</v-card-title
          >
          <v-card-text class="mt-4 pb-2"
            ><v-form ref="form" lazy-validation>
              <v-text-field
                v-model="forms.staff_id"
                label="Staff ID"
                required
              ></v-text-field>
              <v-text-field
                v-model="forms.password"
                label="Password"
                required
              ></v-text-field> </v-form
          ></v-card-text>
          <v-card-actions class="justify-end pt-0 pb-3 mr-2" style="">
            <v-btn type="button" color="primary" @click="generate"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-img src="../assets/login.svg"></v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginPage",

  data() {
    return {
      forms: {
        staff_id: "",
        password: "",
      },
    };
  },

  mounted() {},

  methods: {
    generate: async function () {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/login",
          this.forms,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "Success") {
          window.location = "/home";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
