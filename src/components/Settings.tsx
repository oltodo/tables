import { Checkbox, alpha } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Filter1Icon from "@material-ui/icons/Filter1TwoTone";
import Filter2Icon from "@material-ui/icons/Filter2TwoTone";
import Filter3Icon from "@material-ui/icons/Filter3TwoTone";
import Filter4Icon from "@material-ui/icons/Filter4TwoTone";
import Filter5Icon from "@material-ui/icons/Filter5TwoTone";
import Filter6Icon from "@material-ui/icons/Filter6TwoTone";
import Filter7Icon from "@material-ui/icons/Filter7TwoTone";
import Filter8Icon from "@material-ui/icons/Filter8TwoTone";
import Filter9Icon from "@material-ui/icons/Filter9TwoTone";
import cn from "classnames";
import range from "lodash/range";
import React from "react";

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

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    cursor: "pointer",
    opacity: 0.5,

    "&:hover": {
      opacity: 0.7,
    },
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: theme.spacing(3),
  },
  raceTimeButtons: {
    marginLeft: theme.spacing(2),
  },
  disabled: {
    opacity: 0.2,
  },
  raceTimeButton: {
    margin: theme.spacing(0, 0.5),
    backgroundColor: alpha("#fff", 0.3),
    border: "solid 2px",
    color: alpha("#fff", 0.6),
    width: 32,
    height: 32,
    borderRadius: 16,
    cursor: "pointer",
    opacity: 0.5,

    "&:hover": {
      opacity: 0.7,
    },

    "$disabled &": {
      cursor: "default",

      "&:hover": {
        opacity: 0.5,
      },
    },
  },
  active: {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    opacity: 1,

    "$disabled &": {
      opacity: 0.5,
    },
  },
}));

function Settings({ config, onSubmited, onConfigChanged }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container spacing={10}>
          <Grid item md={12}>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Tables</div>
              <Grid container spacing={2}>
                {range(10).map((i) => {
                  const Icon = tableIcons[i];
                  const checked = config.tables.includes(i);

                  return (
                    <Grid key={i} item xs={6} sm={4} md={2}>
                      <Icon
                        fontSize="large"
                        color={checked ? "primary" : "inherit"}
                        className={classes.table}
                        style={checked ? { opacity: 1 } : {}}
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
            </div>

            <div className={classes.section}>
              <div className={classes.sectionTitle}>Options</div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.random}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, random: checked });
                      }}
                    />
                  }
                  label={"Dans le d??sordre"}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
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
                      checked={config.race}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, race: checked });
                      }}
                    />
                  }
                  label={
                    <>
                      Contre la montre
                      <span
                        className={cn(classes.raceTimeButtons, {
                          [classes.disabled]: !config.race,
                        })}
                      >
                        {range(1, 6).map((i) => (
                          <button
                            key={i}
                            className={cn(classes.raceTimeButton, {
                              [classes.active]: config.raceTime === i,
                            })}
                            onClick={() => {
                              if (config.race) {
                                onConfigChanged({ ...config, raceTime: i });
                              }
                            }}
                          >
                            {i}s
                          </button>
                        ))}
                      </span>
                    </>
                  }
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.sayOperation}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, sayOperation: checked });
                      }}
                    />
                  }
                  label="Prononcer l'op??ration"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={config.sayResult}
                      onChange={({ target: { checked } }) => {
                        onConfigChanged({ ...config, sayResult: checked });
                      }}
                    />
                  }
                  label="Prononcer le r??sultat"
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <Box marginTop={10} display="flex" justifyContent="center">
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
    </div>
  );
}

export default Settings;
