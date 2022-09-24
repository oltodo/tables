import { alpha, Box, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

interface Props {
  duration: number;
  running: boolean;
  onFinished: () => void;
}

function Countdown({ duration, running, onFinished }: Props) {
  const progressRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

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

    if (running) {
      update();
    }
  }, [duration, running, onFinished]);

  return (
    <Box
      sx={{
        width: 200,
        height: 4,
        borderRadius: 2,
        background: alpha("#fff", 0.5),
      }}
    >
      <Box
        sx={{ background: theme.palette.primary.main, height: 4 }}
        ref={progressRef}
      />
    </Box>
  );
}

export default Countdown;
