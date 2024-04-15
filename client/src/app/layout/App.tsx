import { useEffect, useState } from "react";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../utils/utils";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setCart } from "../../features/cart/cartSlice";
// import PlusJakartaSans from "/font/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf";
// import PlusJakartaSansBold from "/font/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf";
import PlusJakartaSansLight from "/font/Plus_Jakarta_Sans/static/PlusJakartaSans-Light.ttf";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");

    if (buyerId) {
      agent.Cart.get()
        .then((cart) => dispatch(setCart(cart)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    typography: {
      fontFamily: [PlusJakartaSansLight].join(","),
    },
    palette: {
      mode: paletteType,
      background: {
        default: "#FFEEED",
      },
      primary: {
        main: "#FFCAC8",
      },
      secondary: {
        main: "#50342B",
      },
      ...(darkMode ? { dark: "#FF9E9E" } : { light: "#F8F988" }),
    },
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Loading Store..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header toggleDarkMode={toggleDarkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;
