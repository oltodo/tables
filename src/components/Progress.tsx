import { Box, CircularProgress } from "@mui/material";

interface Props {
  value: number;
}

function Progress({ value }: Props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          opacity: 0.1,
        }}
      >
        <CircularProgress variant="determinate" color="inherit" value={100} />
      </Box>
    </Box>
  );
}

export default Progress;
