import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("login", "./auth/presentation/Login.tsx"),
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "./sales/presentation/CreateTransaction.tsx"),
] satisfies RouteConfig;
