import { alpha } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

type Props = {
  children: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: alpha("#fff", 0.1),
    padding: theme.spacing(0.5, 1),
    borderRadius: 6,
    border: "solid 1px",
    borderColor: alpha("#fff", 0.3),
    fontSize: "0.8rem",
    opacity: 0.3,
    transition: "opacity 0.2s",

    "&:hover": {
      opacity: 0.7,
    },
  },
}));

function Message({ children }: Props) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default Message;
