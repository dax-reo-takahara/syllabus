import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Root from "../views/Root.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Root,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
