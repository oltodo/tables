import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AllInclusiveIcon from "@material-ui/icons/AllInclusiveTwoTone";
import Filter1Icon from "@material-ui/icons/Filter1TwoTone";
import Filter2Icon from "@material-ui/icons/Filter2TwoTone";
import Filter3Icon from "@material-ui/icons/Filter3TwoTone";
import Filter4Icon from "@material-ui/icons/Filter4TwoTone";
import Filter5Icon from "@material-ui/icons/Filter5TwoTone";
import Filter6Icon from "@material-ui/icons/Filter6TwoTone";
import Filter7Icon from "@material-ui/icons/Filter7TwoTone";
import Filter8Icon from "@material-ui/icons/Filter8TwoTone";
import Filter9Icon from "@material-ui/icons/Filter9TwoTone";
import ShuffleIcon from "@material-ui/icons/ShuffleTwoTone";
import TimerIcon from "@material-ui/icons/TimerTwoTone";
import cn from "classnames";
import { range } from "lodash";
import React from "react";

import { Config } from "../types";
import Filter0Icon from "./Filter0Rounded";
import Message from "./Message";
import Progress from "./Progress";

const icons = [
  Filter0Icon,
  Filter1Icon,
  Filter2Icon,
  Filter3Icon,
  Filter4Icon,
  Filter5Icon,
  Filter6Icon,
  Filter7Icon,
  Filter8Icon,
  Filter9Icon,
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: theme.transitions.create("transform"),
  },
  inner: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    border: "solid 2px rgba(255, 255, 255, 0.4)",
    borderRadius: 4,
    padding: theme.spacing(1, 2),
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  hidden: {
    transform: "translateY(200px)",
  },
  option: {
    margin: theme.spacing(0, 0.5),
    color: "#28f5b7",

    "& svg": {
      display: "block",
    },
  },
  disabled: {
    opacity: 0.2,
    color: "#fff",
  },
  tables: {
    fontSize: 22,
    color: "white",
    lineHeight: "24px",
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  action: {
    marginLeft: theme.spacing(2),
  },
  message: {
    position: "absolute",
    bottom: theme.spacing(10),
  },
}));

interface Props {
  config: Config;
  hidden: boolean;
  progress: number;
  message: string;
  onStop: () => void;
}

function Toolbar({
  config: { tables, random, loop, race },
  hidden,
  progress,
  message = "",
  onStop,
}: Props) {
  const classes = useStyles();

  return (
    <div className={cn(classes.root, { [classes.hidden]: hidden })}>
      {message && (
        <div className={classes.message}>
          <Message>{message}</Message>
        </div>
      )}

      <div className={classes.inner}>
        <div className={classes.tables}>
          {range(10).map((table) => {
            const Icon = icons[table];

            return (
              <div
                key={table}
                className={cn(classes.option, {
                  [classes.disabled]: !tables.includes(table),
                })}
              >
                <Icon />
              </div>
            );
          })}
        </div>

        <div className={cn(classes.option, { [classes.disabled]: !random })}>
          <ShuffleIcon />
        </div>
        <div className={cn(classes.option, { [classes.disabled]: !loop })}>
          <AllInclusiveIcon />
        </div>
        <div className={cn(classes.option, { [classes.disabled]: !race })}>
          <TimerIcon />
        </div>

        <div className={cn(classes.action)}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={onStop}
          >
            Arrêter
          </Button>
        </div>
      </div>

      <Progress value={progress} />
    </div>
  );
}

export default Toolbar;
