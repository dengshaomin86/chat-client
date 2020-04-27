import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const context = require.context("../views", false, /.vue$/);
const defaultRouter = context.keys().map(key => {
  const name = key.substring(key.indexOf("/") + 1, key.lastIndexOf(".vue"));
  return {
    path: key.substring(key.indexOf("/"), key.lastIndexOf(".vue")),
    name,
    component: context(key).default,
    meta: {
      title: name
    }
  };
});

console.log(document.cookie);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("../views/index.vue")
    },
    ...defaultRouter
  ]
});

const pass = ["/login"];

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem("username");
  if (!username && !pass.includes(to.path)) {
    next({
      path: "/login"
    });
  }
  next();
});

export default router;
