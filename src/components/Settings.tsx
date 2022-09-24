import Filter1Icon from "@mui/icons-material/Filter1TwoTone";
import Filter2Icon from "@mui/icons-material/Filter2TwoTone";
import Filter3Icon from "@mui/icons-material/Filter3TwoTone";
import Filter4Icon from "@mui/icons-material/Filter4TwoTone";
import Filter5Icon from "@mui/icons-material/Filter5TwoTone";
import Filter6Icon from "@mui/icons-material/Filter6TwoTone";
import Filter7Icon from "@mui/icons-material/Filter7TwoTone";
import Filter8Icon from "@mui/icons-material/Filter8TwoTone";
import Filter9Icon from "@mui/icons-material/Filter9TwoTone";
import {
  Checkbox,
  alpha,
  useTheme,
  Box,
  Grid,
  Button,
  Container,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import range from "lodash/range";

import { Config } from "../types";
import Filter0Icon from "./Filter0Rounded";

interface Props {
  config: Config;
  onSubmited: () => void;
  onConfigChanged: (range: Config) => void;
}

const tableIcons = [
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

function CircleButton({
  size = "small",
  active,
  disabled = false,
  children,
  onClick,
}: {
  size?: "small" | "big";
  active: boolean;
  disabled?: boolean;
  children: string;
  onClick: () => void;
}) {
  const theme = useTheme();

  const multiplier = size === "big" ? 1.2 : 1;

  return (
    <Box
      component="button"
      sx={{
        backgroundColor: alpha("#fff", 0.3),
        border: "solid 2px",
        color: alpha("#fff", 0.6),
        width: 32 * multiplier,
        height: 32 * multiplier,
        borderRadius: 16 * multiplier,
        cursor: disabled ? "default" : "pointer",
        fontSize: `${0.8 * multiplier}rem`,
        opacity: 0.5,

        "&:hover": {
          opacity: disabled ? 0.5 : 0.7,
        },

        ...(active
          ? {
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
              opacity: disabled ? 0.5 : 1,
            }
          : {}),
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}

function Settings({ config, onSubmited, onConfigChanged }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Grid container spacing={10}>
          <Grid item md={12}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ fontWeight: 600, fontSize: 16, mb: 3 }}>
                Type d'opération
              </Box>
              <RadioGroup
                value={config.operator}
                onChange={(event) => {
                  onConfigChanged({
                    ...config,
                    operator: event.target.value === "+" ? "+" : "x",
                  });
                }}
                row
              >
                <FormControlLabel
                  value="+"
                  control={<Radio />}
                  label="Addition"
                />
                <FormControlLabel
                  value="x"
                  control={<Radio />}
                  label="Multiplication"
                />
              </RadioGroup>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ fontWeight: 600, fontSize: 16, mb: 3 }}>Tables</Box>

              <Grid container spacing={2}>
                {range(10).map((i) => {
                  const Icon = tableIcons[i];
                  const checked = config.tables.includes(i);

                  return (
                    <Grid key={i} item xs={6} sm={4} md={2}>
                      <Icon
                        sx={{
                          cursor: "pointer",
                          opacity: checked ? 1 : 0.5,

                          "&:hover": {
                            opacity: 0.7,
                          },
                        }}
                        fontSize="large"
                        color={checked ? "primary" : "inherit"}
                        onClick={() => {
                          onConfigChanged({
                            ...config,
                            tables: checked
                              ? config.tables.filter((table) => table !== i)
                              : config.tables.concat([i]),
                          });
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ fontWeight: 600, fontSize: 16, mb: 3 }}>Opérandes</Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {range(0, 11).map((i) => (
                  <CircleButton
                    key={i}
                    size="big"
                    active={config.operands.includes(i)}
                    onClick={() => {
                      onConfigChanged({
                        ...config,
                        operands: config.operands.includes(i)
                          ? config.operands.filter((m) => m !== i)
                          : config.operands.concat([i]),
                      });
                    }}
                  >
                    {`${config.operator}${i}`}
                  </CircleButton>
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ fontWeight: 600, fontSize: 16, mb: 3 }}>Options</Box>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={config.random}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, random: checked });
                      }}
                    />
                  }
                  label={"Dans le désordre"}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={config.loop}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, loop: checked });
                      }}
                    />
                  }
                  label={"En boucle"}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={config.race}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, race: checked });
                      }}
                    />
                  }
                  label="Contre la montre"
                />
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 1,
                    ml: 2,
                    opacity: config.race ? 1 : 0.2,
                  }}
                >
                  {range(1, 6).map((i) => (
                    <CircleButton
                      key={i}
                      active={config.raceTime === i}
                      disabled={!config.race}
                      onClick={() => {
                        if (config.race) {
                          onConfigChanged({ ...config, raceTime: i });
                        }
                      }}
                    >
                      {`${i}s`}
                    </CircleButton>
                  ))}
                </Box>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={config.sayOperation}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, sayOperation: checked });
                      }}
                    />
                  }
                  label="Prononcer l'opération"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={config.sayResult}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, sayResult: checked });
                      }}
                    />
                  }
                  label="Prononcer le résultat"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={onSubmited}
          >
            Commencer
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings;
