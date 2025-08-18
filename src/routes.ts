import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/login", "./pages/login.tsx"),
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "./pages/create-transaction/index.tsx"),
] satisfies RouteConfig;
