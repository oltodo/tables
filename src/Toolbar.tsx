import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    transition: theme.transitions.create("transform"),
  },
  hidden: {
    transform: "translateY(72px)",
  },
  disabled: {
    opacity: 0.5,
  },
  tables: {
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "white",
    border: "solid 2px",
    borderRadius: 4,
    lineHeight: "24px",
    fontWeight: 600,
    padding: theme.spacing(0, 1),
    display: "inline-block",
    textAlign: "center",
  },
}));

interface Props {
  tables: number[];
  hidden: boolean;
}

function Toolbar({ tables, hidden }: Props) {
  const classes = useStyles();

  return (
    <div className={cn(classes.root, { [classes.hidden]: hidden })}>
      <div className={cn(classes.tables, classes.disabled)}>
        {tables.map((table) => `x${table}`).join(", ")}
      </div>
    </div>
  );
}

export default Toolbar;
