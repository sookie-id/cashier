import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./sales/presentation/CreateTransaction.tsx"),
  route("/login", "./auth/presentation/Login.tsx"),
  route("/sales", "./sales/presentation/SalesList.tsx"),
  route("/customers", "./customers/presentation/CustomerList.tsx"),
  route("/menu", "./menu/presentation/Menu.tsx"),
] satisfies RouteConfig;
