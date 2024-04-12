import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Container>
      <Paper>
        {state?.error ? (
          <>
            <Typography gutterBottom variant="h5">
              {state.error.title}
            </Typography>
            <Divider />
            <Typography variant="body1">
              {state.error.details || "Internal Server Error"}
            </Typography>
          </>
        ) : (
          <Typography gutterBottom variant="h5">
            Server Error
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
