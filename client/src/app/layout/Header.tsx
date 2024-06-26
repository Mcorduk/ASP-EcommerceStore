import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Link,
  List,
  Toolbar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Import the missing Brightness4Icon component
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";

import logo from "/logo.png";

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

const navStyles = {
  color: "inherit",
  ml: 2,
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

interface PropsType {
  toggleDarkMode: () => void;
}

export default function Header({ toggleDarkMode }: PropsType) {
  const { cart } = useAppSelector((state) => state.cart);
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 85,
        }}
      >
        <Box display="flex" alignItems="center">
          <img
            src={logo}
            alt="logo"
            height="150"
            style={{ zIndex: 99, marginTop: 20 }}
          />{" "}
          <Link
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ color: "inherit", ml: 2 }}
          >
            {/* Adjust the height as needed */}
            PlushPlush
          </Link>
          <IconButton aria-label="toggle dark mode" onClick={toggleDarkMode}>
            <Brightness4Icon />
          </IconButton>
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <Link to={path} key={path} component={NavLink} sx={navStyles}>
              {title}
            </Link>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <Link sx={{ color: "inherit", ml: 2 }} component={NavLink} to="/cart">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>

          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <Link to={path} key={path} component={NavLink} sx={navStyles}>
                {title}
              </Link>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
