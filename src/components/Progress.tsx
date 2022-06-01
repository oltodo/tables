import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
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
  value: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      <Box className={classes.value}>
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </div>
  );
}

export default Progress;
