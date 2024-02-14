import { createRouter, createWebHistory } from "vue-router";
import Hipodrom from "@/views/HipodromView.vue";

const routes = [
  {
    path: "/",
    redirect: "/race",
  },
  {
    path: "/race",
    name: "race",
    component: Hipodrom,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
