import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" align="center">
        {"Copyright © "}
        <MuiLink color="inherit" href="https://github.com/annaperdomo">
          Variations on a String
        </MuiLink>
        &nbsp;
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
