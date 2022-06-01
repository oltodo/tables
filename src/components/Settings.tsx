import { Checkbox } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import range from "lodash/range";
import React from "react";

import { Config } from "../types";

interface Props {
  config: Config;
  onSubmited: () => void;
  onConfigChanged: (range: Config) => void;
}

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
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: theme.spacing(3),
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
              <Grid container>
                {range(10).map((i) => (
                  <Grid key={i} item xs={6} sm={4} md={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={config.tables.includes(i)}
                          onChange={({ target: { checked } }) => {
                            onConfigChanged({
                              ...config,
                              tables: checked
                                ? config.tables.concat([i])
                                : config.tables.filter((table) => table !== i),
                            });
                          }}
                        />
                      }
                      label={`x ${i}`}
                    />
                  </Grid>
                ))}
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
                  label={"Dans le désordre"}
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
