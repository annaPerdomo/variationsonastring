import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";

import Copyright from "./Copyright";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactElement<unknown>;
}

export default function Layout({ children }: Props) {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Navigation />

        <main>{children}</main>
      </Box>

      <footer>
        <Copyright />
      </footer>
    </Container>
  );
}
