import { alpha, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";

interface Props {
  duration: number;
  onFinished: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 4,
    borderRadius: 2,
    background: alpha("#fff", 0.5),
  },
  inner: {
    background: theme.palette.primary.main,
    height: 4,
  },
}));

function Countdown({ duration, onFinished }: Props) {
  const classes = useStyles();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = Date.now();

    progressRef.current!.style.width = "100%";

    const update = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = duration - elapsed;

      if (remaining > 0) {
        progressRef.current!.style.width = `${Math.round(
          (remaining / duration) * 100
        )}%`;
        requestAnimationFrame(update);
      } else {
        onFinished();
      }
    };

    update();
  }, [duration, onFinished]);

  return (
    <div className={classes.root}>
      <div className={classes.inner} ref={progressRef} />
    </div>
  );
}

export default Countdown;
