import { createRouter, createWebHistory } from "vue-router";
import Albums from "../components/Albums.vue";
import Todos from "../components/Todos.vue";

const routes = [
  { path: "/", redirect: "/todos" },
  { path: "/todos", component: Todos },
  { path: "/albums/:id", component: Albums, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
