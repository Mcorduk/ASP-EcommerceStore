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
    palette: {
      mode: paletteType,
      primary: {
        main: "#FFCAC8",
      },
      secondary: {
        main: "#C0EEE4",
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
