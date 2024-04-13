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
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/utils";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { setCart } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");

    if (buyerId) {
      agent.Cart.get()
        .then((cart) => setCart(cart))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setCart]);

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
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
