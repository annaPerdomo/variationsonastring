import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { kebabCase, startCase } from "lodash";

interface CraftImage {
  height: number;
  url: string;
}

interface Craft {
  description: string | React.ReactElement<unknown>;
  images: CraftImage[];
  title: string;
  type: string;
}

export default function Crafts() {
  const cardMaxWidth = 345;
  const crafts: Craft[] = [
    {
      description: "Completed October 30th, 2022",
      images: [
        { height: 240, url: "https://i.imgur.com/JWV2oJh.jpg" },
        { height: 140, url: "https://i.imgur.com/cAzvOoI.jpg" },
      ],
      title: "Halloween Table Runner",
      type: "crochet",
    },
    {
      description: "Completed September 21st, 2022",
      images: [{ height: 240, url: "https://i.imgur.com/x6tfjo8.jpg" }],
      title: "Baby Blanket and Matching Poro Lovey",
      type: "crochet",
    },
    {
      description: "Completed June 23rd, 2021",
      images: [{ height: 440, url: "https://i.imgur.com/f9h8e2a.jpg" }],
      title: "Baby Blanket - DnD & Space Themed",
      type: "crochet",
    },
    {
      description: "Completed August 29th, 2018",
      images: [
        { height: 240, url: "https://i.imgur.com/9Idv1Fe.jpg" },
        { height: 240, url: "https://i.imgur.com/6ZxdnN9.jpg" },
        { height: 440, url: "https://i.imgur.com/I6y6h7E.jpg" },
      ],
      title: "Dragonscale Dice Bag",
      type: "crochet",
    },
  ];
  return (
    <Container maxWidth="lg" sx={{ height: "80vh", overflowY: "auto" }}>
      <Box>
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
          {crafts.map((craft) => {
            return (
              <Grid item key={craft.title}>
                <Card sx={{ maxWidth: cardMaxWidth }}>
                  {craft.images.map((image, i) => {
                    const alt = `${kebabCase(craft.title)}-${i + 1}`;
                    return (
                      <CardMedia
                        component="img"
                        height={image.height}
                        key={alt}
                        image={image.url}
                        alt={alt}
                      />
                    );
                  })}

                  <CardContent>
                    <Typography component="span" gutterBottom variant="h5">
                      {craft.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {startCase(craft.type)}&nbsp;-&nbsp;{craft.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
