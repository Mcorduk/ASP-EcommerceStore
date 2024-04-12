import { Container, Typography, Box, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  };

  const subtitleStyle = {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  };

  return (
    <Container
      style={{
        ...containerStyle,
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography style={titleStyle} gutterBottom variant="h1">
        404
      </Typography>
      <Typography style={subtitleStyle} variant="h2">
        Oops! Page not found.
      </Typography>
      <Typography variant="body1">
        We can't find the page you're looking for.
      </Typography>
      <Link component={NavLink} to="/">
        Go to Home
      </Link>
    </Container>
  );
}
