import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("login", "./auth/login.tsx"),
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "./transaction/new.tsx"),
] satisfies RouteConfig;
