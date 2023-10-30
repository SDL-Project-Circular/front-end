import Vue from "vue";
import VueRouter from "vue-router";
import SettingsPage from "@/views/SettingsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "circulars",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/HomePage.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
  },
  {
    path: "/template",
    name: "UseTemplate",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/UseTemplate.vue"),
  },
  {
    path: "/newtemplate",
    name: "CreateTemplates",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/CreateTemplates.vue"),
  },
  {
    path: "/templatepage",
    name: "templatepage",
    component: () =>
      import(/* webpackChunkName: "templates" */ "@/views/TemplatesView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
