import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Videos() {
  return (
    <Container maxWidth="lg" sx={{ height: "80vh", overflowY: "auto" }}>
      <Box>
        <Grid
          alignItems="center"
          container
          direction="column"
          justifyContent="center"
          sx={{ my: 2, width: "100%" }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Videos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" component="div" gutterBottom>
              A list of videos that I have created/edited
            </Typography>
          </Grid>
        </Grid>

        <Grid
          alignItems="center"
          container
          justifyContent="center"
          spacing={{ xs: 2, md: 3 }}
          sx={{ pt: 2 }}
        >
          <Grid item>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/SSdPp6KwKr0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Grid>

          <Grid item>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/wpBDWXHUG5c"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Grid>

          <Grid item>
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              frameborder="0"
              height="315"
              src="https://www.youtube.com/embed/GGSFg4iSp5c"
              title="YouTube video player"
              width="560"
            ></iframe>
          </Grid>

          <Grid item>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/BF8kIE-MNLw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
