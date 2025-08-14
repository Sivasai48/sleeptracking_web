// src/router.js
import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import SleepPage from "./components/SleepPage.vue"; // ✅ Add this
import StatisticsPage from "./components/StatisticsPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/sleep-entry", component: SleepPage }, // ✅ This is important!
  { path: "/statistics", component: StatisticsPage },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
