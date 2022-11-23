import AppBar from "@mui/material/AppBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { lowerCase } from "lodash";
import * as React from "react";

import Link from "../src/Link";

const pages = ["About", "Crafts", "Videos", "Work"];

function Naviation() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={Link}
                  href={`/${lowerCase(page)}`}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Grid
              alignItems="center"
              container
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <Button
                  component={Link}
                  href="/"
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  <Box sx={{ mr: 1, mt: 1 }}>
                    <ArrowBackIosIcon />
                    <MusicNoteIcon />
                    <ArrowForwardIosIcon sx={{ ml: 1 }} />
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Button component={Link} href="/">
              <ArrowBackIosIcon />
              <MusicNoteIcon />
              <ArrowForwardIosIcon sx={{ ml: 1 }} />
            </Button>
            {pages.map((page) => (
              <Button
                component={Link}
                href={`/${lowerCase(page)}`}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Naviation;
