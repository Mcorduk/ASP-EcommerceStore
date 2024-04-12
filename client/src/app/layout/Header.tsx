import {
  AppBar,
  Badge,
  IconButton,
  Link,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Import the missing Brightness4Icon component
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

const midLinks = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];
const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

interface PropsType {
  toggleDarkMode: () => void;
}

export default function Header({ toggleDarkMode }: PropsType) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Link
          variant="h6"
          component={NavLink}
          to="/"
          sx={{ color: "inherit", ml: 2 }}
        >
          Ecommerce Store
        </Link>
        <IconButton aria-label="toggle dark mode" onClick={toggleDarkMode}>
          <Brightness4Icon />
        </IconButton>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <Link
              to={path}
              key={path}
              component={NavLink}
              sx={{
                color: "inherit",
                ml: 2,
                "&:hover": {
                  color: "grey.500",
                  textDecoration: "none",
                },
                "&.active": {
                  color: "text.secondary",
                },
              }}
            >
              {title}
            </Link>
          ))}
        </List>

        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent="4" color="secondary">
            {/* Add the missing ShoppingCartIcon component */}
            <ShoppingCart />
          </Badge>
        </IconButton>

        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <Link
              to={path}
              key={path}
              component={NavLink}
              sx={{
                color: "inherit",
                ml: 2,
                "&:hover": {
                  color: "grey.500",
                  textDecoration: "none",
                },
                "&.active": {
                  color: "text.secondary",
                },
              }}
            >
              {title}
            </Link>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
}
