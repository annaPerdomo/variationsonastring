import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";

const DynamicVideo = dynamic(() => import("../src/Video"), { ssr: false });

export default function Videos() {
  const videos = [
    "https://www.youtube.com/embed/SSdPp6KwKr0",
    "https://www.youtube.com/embed/wpBDWXHUG5c",
    "https://www.youtube.com/embed/GGSFg4iSp5c",
    "https://www.youtube.com/embed/BF8kIE-MNLw",
  ];
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
          {videos.map((video) => (
            <Grid item key={video}>
              <DynamicVideo src={video} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
