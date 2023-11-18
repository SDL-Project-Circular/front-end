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
                type="email"
                v-model="forms.email"
                label="Email ID"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="forms.password"
                :rules="[rules.required]"
                label="Password"
                required
              ></v-text-field> </v-form
          ></v-card-text>
          <v-card-text style="color: crimson" class="pt-0 pb-0">{{
            error
          }}</v-card-text>
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
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      error: "",
    };
  },

  mounted() {},

  methods: {
    generate: async function () {
      if (!this.$refs.form.validate()) {
        return;
      }
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/login-user",
          this.forms,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.message === "Success") {
          localStorage.setItem("auth-token", response.data.token);
          localStorage.setItem("role", response.data.role);
          window.location = "/home";
        } else {
          this.error = response.data.error;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
