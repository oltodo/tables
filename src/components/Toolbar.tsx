import AllInclusiveIcon from "@mui/icons-material/AllInclusiveTwoTone";
import Filter1Icon from "@mui/icons-material/Filter1TwoTone";
import Filter2Icon from "@mui/icons-material/Filter2TwoTone";
import Filter3Icon from "@mui/icons-material/Filter3TwoTone";
import Filter4Icon from "@mui/icons-material/Filter4TwoTone";
import Filter5Icon from "@mui/icons-material/Filter5TwoTone";
import Filter6Icon from "@mui/icons-material/Filter6TwoTone";
import Filter7Icon from "@mui/icons-material/Filter7TwoTone";
import Filter8Icon from "@mui/icons-material/Filter8TwoTone";
import Filter9Icon from "@mui/icons-material/Filter9TwoTone";
import ShuffleIcon from "@mui/icons-material/ShuffleTwoTone";
import TimerIcon from "@mui/icons-material/TimerTwoTone";
import { Box, Button, useTheme } from "@mui/material";
import { range } from "lodash";
import { ReactNode } from "react";

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

interface Props {
  config: Config;
  hidden: boolean;
  progress: number;
  message: string;
  onStop: () => void;
}

function Option({
  disabled,
  children,
}: {
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        mx: 0.5,
        color: disabled ? "#fff" : "#28f5b7",
        opacity: disabled ? 0.2 : 1,

        "& svg": {
          display: "block",
        },
      }}
    >
      {children}
    </Box>
  );
}

function Toolbar({
  config: { tables, random, loop, race },
  hidden,
  progress,
  message = "",
  onStop,
}: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        left: 0,
        bottom: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: theme.transitions.create("transform"),
        transform: hidden ? "translateY(200px)" : "none",
      }}
    >
      {message && (
        <Box sx={{ position: "absolute", bottom: 80 }}>
          <Message>{message}</Message>
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "solid 2px rgba(255, 255, 255, 0.4)",
          borderRadius: 1,
          py: 1,
          px: 2,
          mr: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: 22,
            color: "white",
            lineHeight: "24px",
            display: "flex",
            alignItems: "center",
            mr: 1,
          }}
        >
          {range(10).map((table) => {
            const Icon = icons[table];

            return (
              <Option key={table} disabled={!tables.includes(table)}>
                <Icon />
              </Option>
            );
          })}
        </Box>

        <Option disabled={!random}>
          <ShuffleIcon />
        </Option>
        <Option disabled={!loop}>
          <AllInclusiveIcon />
        </Option>
        <Option disabled={!race}>
          <TimerIcon />
        </Option>

        <Box sx={{ ml: 2 }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={onStop}
          >
            Arrêter
          </Button>
        </Box>
      </Box>

      <Progress value={progress} />
    </Box>
  );
}

export default Toolbar;
