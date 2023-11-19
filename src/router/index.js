import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/LoginPage.vue"),
  },
  {
    path: "/home",
    name: "CircularView",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        localStorage.getItem("role") === "admin"
      ) {
        next();
      } else {
        next("/");
      }
    },
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/HomePage.vue"),
  },

  {
    path: "/homepageforhod",
    name: "HodHome",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        localStorage.getItem("role") === "HOD"
      ) {
        next();
      } else {
        next("/");
      }
    },
    component: () =>
      import(/*webpackChunkName: "templates" */ "@/views/HodDisplay.vue"),
  },
  {
    path: "/template",
    name: "UseTemplate",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/UseTemplate.vue"),
  },
  {
    path: "/newtemplate",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        localStorage.getItem("role") === "admin"
      ) {
        next();
      } else {
        next("/");
      }
    },
    name: "CreateTemplates",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/CreateTemplates.vue"),
  },
  {
    path: "/templatepage",
    name: "templatepage",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        localStorage.getItem("role") === "admin"
      ) {
        next();
      } else {
        next("/");
      }
    },
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/TemplatesView.vue"),
  },
  {
    path: "/circular",
    name: "CircularPreview",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        (localStorage.getItem("role") === "admin" ||
          localStorage.getItem("role") === "HOD")
      ) {
        next();
      } else {
        next("/");
      }
    },
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/CircularPreview.vue"),
  },
  {
    path: "/editcircular",
    name: "EditCircular",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        localStorage.getItem("role") === "admin"
      ) {
        next();
      } else {
        next("/");
      }
    },
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/EditCircular.vue"),
  },
  {
    path: "/pending",
    name: "ApproveCircular",
    beforeEnter: (to, from, next) => {
      if (
        (localStorage.getItem("auth-token") ? true : false) &&
        localStorage.getItem("role") === "HOD"
      ) {
        next();
      } else {
        next("/");
      }
    },
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/ApproveCircular.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
