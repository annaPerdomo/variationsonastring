import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ height: "80vh" }}>
      <Grid
        alignItems="center"
        container
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Variations on a String
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
