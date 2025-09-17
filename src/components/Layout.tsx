import { SettingsApplicationsOutlined } from "@mui/icons-material";
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
      <Navigation />

      <section>
        {children}
      </section>

      <footer>
        <Copyright />
      </footer>
    </Container>
  );
}
