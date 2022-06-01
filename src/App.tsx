import { makeStyles } from "@material-ui/core/styles";
import { flatten, shuffle } from "lodash";
import range from "lodash/range";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import Settings from "./components/Settings";
import Toolbar from "./components/Toolbar";
import { Config } from "./types";

function calc(operation: Operation): number {
  switch (operation.operator) {
    case "+":
      return operation.operands.reduce((acc, curr) => acc + curr);
    case "-":
      return operation.operands.reduce((acc, curr) => acc - curr);
    case "x":
      return operation.operands.reduce((acc, curr) => acc * curr);
    case "/":
      return operation.operands.reduce((acc, curr) => acc / curr);
    default:
      return 0;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
  operation: {
    fontSize: "10vw",
  },
}));

const defaultConfig: Config = {
  tables: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  random: false,
  loop: false,
};

interface Operation {
  operator: "+" | "-" | "x" | "/";
  operands: number[];
}

function App() {
  const [config = defaultConfig, setConfig] = useLocalStorage<Config>(
    "config",
    defaultConfig
  );

  const [started, setStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [operations, setOperations] = useState<Operation[]>([]);
  const classes = useStyles();

  const start = useCallback((): void => {
    const items = flatten<Operation>(
      config.tables.map((table) =>
        range(10).map((operand) => ({
          operator: "x",
          operands: [operand, table],
        }))
      )
    );

    setOperations(config.random ? shuffle(items) : items);
    setCurrentIndex(0);
    setStarted(true);
  }, [config.random, config.tables]);

  useEffect(() => {
    setConfig({ ...defaultConfig, ...config });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!started) {
      return () => {};
    }

    const next = async () => {
      if (!showResult) {
        setShowResult(true);
        return;
      }

      setShowResult(false);

      if (currentIndex < operations.length - 1) {
        setCurrentIndex(currentIndex + 1);
        return;
      }

      if (config.loop) {
        start();
        return;
      }

      setStarted(false);
    };

    const handleKeydown = async (event: KeyboardEvent) => {
      if (event.code === "Space") {
        next();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentIndex, operations, started, showResult, config.loop, start]);

  const renderOperation = () => {
    const op = operations[currentIndex];

    return (
      <span className={classes.operation}>
        {op.operands.join(` ${op.operator} `)}
        {" = "}
        <span style={{ visibility: showResult ? "visible" : "hidden" }}>
          {calc(op)}
        </span>
      </span>
    );
  };

  return (
    <div className={classes.root}>
      {started ? (
        renderOperation()
      ) : (
        <Settings
          config={config}
          onConfigChanged={(newConfig) => {
            setConfig({ ...config, ...newConfig });
          }}
          onSubmited={start}
        />
      )}

      <Toolbar
        config={config}
        hidden={!started}
        onStop={() => {
          setStarted(false);
        }}
      />
    </div>
  );
}

export default App;
