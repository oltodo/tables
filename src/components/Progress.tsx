import { Box, CircularProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

interface Props {
  value: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-flex",
  },
  shadow: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    opacity: 0.1,
  },
}));

function Progress({ value }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress variant="determinate" value={value} />
      <Box className={classes.shadow}>
        <CircularProgress variant="determinate" color="inherit" value={100} />
      </Box>
    </div>
  );
}

export default Progress;
