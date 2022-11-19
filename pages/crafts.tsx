import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Crafts() {
  const cardMaxWidth = 345;

  return (
    <Container maxWidth="lg" sx={{ height: "80vh" }}>
      <Box sx={{ height: "100%" }}>
        <Grid
          alignItems="center"
          container
          justifyContent="center"
          sx={{ my: 2 }}
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
              Crafts
            </Typography>
          </Grid>
        </Grid>

        <Grid
          alignItems="center"
          container
          justifyContent="center"
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item>
            <Card sx={{ maxWidth: cardMaxWidth }}>
              <CardMedia
                component="img"
                height="240"
                image="https://i.imgur.com/JWV2oJh.jpg"
                alt="halloween-table-runner-close-up"
              />
              <CardMedia
                component="img"
                height="140"
                image="https://i.imgur.com/cAzvOoI.jpg"
                alt="halloween-table-runner"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Halloween Table Runner
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed October 30th, 2022
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card sx={{ maxWidth: cardMaxWidth }}>
              <CardMedia
                component="img"
                height="240"
                image="https://i.imgur.com/x6tfjo8.jpg"
                alt="baby-blanket-and-poro-lovey"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Baby Blanket and Matching Poro Lovey
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed September 21st, 2022
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card sx={{ maxWidth: cardMaxWidth }}>
              <CardMedia
                component="img"
                height="440"
                image="https://i.imgur.com/f9h8e2a.jpg"
                alt="space-dnd-themed-baby-blanket"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Baby Blanket - DnD & Space Themed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed June 23rd, 2021
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
