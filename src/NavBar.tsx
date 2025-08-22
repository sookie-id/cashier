import { NavLink } from "react-router";
import { Nav } from "./NavBar.styled";

export default function NavBar() {
  return (
    <Nav>
      <NavLink to="/">New Sale</NavLink>
      <NavLink to="/sales">Sales</NavLink>
      <NavLink to="/customers">Customers</NavLink>
      <NavLink to="/menu">Menu</NavLink>
    </Nav>
  );
}
