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
      description: "Completed August 23rd, 2019",
      images: [{ height: 340, url: "https://i.imgur.com/nXHZIzU.jpg" }],
      title: "Fancy Burp Cloths",
      type: "crochet",
    },
    {
      description: "Completed May 22nd, 2019",
      images: [{ height: 420, url: "https://i.imgur.com/vhYNy6W.jpg" }],
      title: "Baby Birth Announcement - Bears",
      type: "cross-stitch",
    },
    {
      description: "Completed May 9th, 2019",
      images: [
        { height: 280, url: "https://i.imgur.com/jIVz8Qx.jpg``" },
        { height: 280, url: "https://i.imgur.com/5VZlR5e.jpg" },
      ],
      title: "Slouchy Hat",
      type: "knitting",
    },
    {
      description: "Completed February 14th, 2019",
      images: [{ height: 280, url: "https://i.imgur.com/7BmogOa.jpg" }],
      title: "Baby Blanket",
      type: "crochet",
    },
    {
      description: "Completed September 4th, 2018",
      images: [{ height: 480, url: "https://i.imgur.com/epMqafF.jpg" }],
      title: "Wedding Announcement - Doves + Heart Wreath",
      type: "cross-stitch",
    },
    {
      description: "Completed August 29th, 2018",
      images: [
        { height: 240, url: "https://i.imgur.com/9Idv1Fe.jpg" },
        { height: 240, url: "https://i.imgur.com/6ZxdnN9.jpg" },
        { height: 440, url: "https://i.imgur.com/I6y6h7E.jpg" },
      ],
      title: "Dragonscale Dice Bags",
      type: "crochet",
    },
    {
      description: "Completed August 29th, 2018",
      images: [{ height: 480, url: "https://i.imgur.com/wyslChN.jpg" }],
      title: "Wedding Announcement - Old English Blessing",
      type: "cross-stitch",
    },
    {
      description: "Completed October 20th, 2017",
      images: [{ height: 280, url: "https://i.imgur.com/gRj2nVV.jpg" }],
      title: "Wedding Announcement - Doves & Bells",
      type: "cross-stitch",
    },
    {
      description: "Completed August 18th, 2016",
      images: [
        { height: 240, url: "https://i.imgur.com/gKIzzXX.jpg" },
        { height: 240, url: "https://i.imgur.com/CnfAHdM.jpg" },
      ],
      title: "Bookmarks for Gamer Friends",
      type: "crochet",
    },
    {
      description: "Completed February 22nd, 2016",
      images: [{ height: 640, url: "https://i.imgur.com/2cn0D2D.jpg" }],
      title: "Han Solo + Quote",
      type: "cross-stitch",
    },
    {
      description: "Completed February 5th, 2016",
      images: [{ height: 440, url: "https://i.imgur.com/9zOqgBP.jpg" }],
      title: "May Cthulu Devour This House Last",
      type: "cross-stitch",
    },
    {
      description: "Completed December 30th, 2015",
      images: [{ height: 640, url: "https://i.imgur.com/25CqlQV.jpg" }],
      title: "Katara Bookmark",
      type: "cross-stitch",
    },
    {
      description: "Completed December 28th, 2015",
      images: [{ height: 640, url: "https://i.imgur.com/g40zM8g.jpg" }],
      title: "Dark Side Bookmark",
      type: "cross-stitch",
    },
    {
      description: "Completed December 21st, 2015",
      images: [{ height: 240, url: "https://i.imgur.com/VgpgINl.jpg" }],
      title: "Gift for my Dad",
      type: "cross-stitch",
    },
    {
      description: "Completed December 6th, 2015",
      images: [{ height: 280, url: "https://i.imgur.com/vF8RBIk.jpg" }],
      title: "The Guardian by Teresa Wentzler",
      type: "cross-stitch",
    },
    {
      description: "Completed September 1st, 2015",
      images: [{ height: 440, url: "https://i.imgur.com/1QAjVyM.jpg" }],
      title: "Wedding Announcement - Zelda + Link",
      type: "cross-stitch",
    },
    {
      description:
        "Sewed the jacket and the short pants. Completed October 31st, 2014",
      images: [{ height: 440, url: "https://i.imgur.com/u4AR118.jpg" }],
      title: "Captain Hook Costume",
      type: "sewing",
    },
    {
      description: "Completed 2014",
      images: [{ height: 260, url: "https://i.imgur.com/fCIg9sy.jpg" }],
      title: "Stark Sigil Scarf",
      type: "knitting",
    },
    {
      description: "Completed February 18th, 2014",
      images: [
        { height: 260, url: "https://i.imgur.com/MaNLOfe.jpg" },
        { height: 260, url: "https://i.imgur.com/MRCfizx.jpg" },
      ],
      title: "Viking Hat",
      type: "crochet",
    },
    {
      description: "Completed April 15th, 2013",
      images: [
        { height: 260, url: "https://i.imgur.com/KfREV4w.jpg" },
        { height: 200, url: "https://i.imgur.com/HBAUfun.jpg" },
      ],
      title: "Baby Blanket - Soccer",
      type: "crochet",
    },
    {
      description: "Completed October 3rd, 2012",
      images: [
        { height: 260, url: "https://i.imgur.com/80975KV.jpg" },
        { height: 260, url: "https://i.imgur.com/oN4hP01.jpg" },
      ],
      title: "Jedi Tunic",
      type: "sewing",
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
                    const altText = `${kebabCase(craft.title)}-${i + 1}`;
                    return (
                      <CardMedia
                        component="img"
                        height={image.height}
                        key={altText}
                        image={image.url}
                        alt={altText}
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
