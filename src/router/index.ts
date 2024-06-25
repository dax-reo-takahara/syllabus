import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Root from "../views/Root.vue";
import Home from "../views/Home.vue";
import RoutingTest from "../components/RoutingTest.vue";
import ChildA from "../components/ChildC.vue";
import ChildB from "../components/ChildC.vue";
import ChildC from "../components/ChildC.vue";

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
      {
        path: "/routing_test",
        name: "routing_test",
        component: RoutingTest,
        children: [
          {
            path: "/child_a",
            name: "child_a",
            component: ChildA,
          },
          {
            path: "/child_b",
            name: "child_b",
            component: ChildB,
          },
          {
            path: "/child_c",
            name: "child_c",
            component: ChildC,
          },
        ],
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
