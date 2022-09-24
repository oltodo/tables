import { Box } from "@mui/material";
import { flatten, shuffle } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import Countdown from "./components/Countdown";
import Settings from "./components/Settings";
import Toolbar from "./components/Toolbar";
import { Config, Operation } from "./types";
import { speak, speakOperation } from "./utils/voice";

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

const defaultConfig: Config = {
  operator: "x",
  tables: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  operands: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  random: false,
  loop: false,
  race: false,
  raceTime: 3,
  sayOperation: false,
  sayResult: false,
};

function App() {
  const [config = defaultConfig, setConfig] = useLocalStorage<Config>(
    "config",
    defaultConfig
  );

  const [started, setStarted] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [operations, setOperations] = useState<Operation[]>([]);

  const handleCountdownFinished = useMemo(() => {
    return () => {
      setShowResult(true);
    };
  }, []);

  const result = operations.length ? calc(operations[currentIndex]) : 0;

  const start = useCallback((): void => {
    const items = flatten<Operation>(
      config.tables.map((table) =>
        config.operands.map((operand) => ({
          operator: config.operator,
          operands: [operand, table],
        }))
      )
    );

    setReady(false);
    setShowResult(false);
    setOperations(config.random ? shuffle(items) : items);
    setCurrentIndex(0);
    setStarted(true);
  }, [config.operands, config.operator, config.random, config.tables]);

  useEffect(() => {
    setConfig({ ...defaultConfig, ...config });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (operations.length === 0 || !started) {
      return;
    }

    const speech = async () => {
      if (config.sayOperation && !showResult) {
        await speakOperation(operations[currentIndex]);
        setReady(true);
      }
      if (config.sayResult && showResult) {
        speak(`${result}`);
      }
    };

    speech();
  }, [
    config.sayOperation,
    config.sayResult,
    currentIndex,
    operations,
    result,
    showResult,
    started,
  ]);

  useEffect(() => {
    if (!started) {
      return () => {};
    }

    const next = async () => {
      if (!showResult) {
        if (!config.race) {
          setShowResult(true);
        }
        return;
      }

      setReady(false);
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
  }, [
    currentIndex,
    operations,
    started,
    showResult,
    config.loop,
    start,
    config.race,
  ]);

  const renderOperation = () => {
    const op = operations[currentIndex];

    const running = !config.sayOperation || ready;

    return (
      <>
        <Box sx={{ fontSize: "10vw", mb: 8 }}>
          {op.operands.join(` ${op.operator} `)}
          {showResult ? ` = ${result}` : ""}
        </Box>
        {config.race && (
          <div
            style={{
              visibility: showResult || !running ? "hidden" : "visible",
            }}
          >
            <Countdown
              duration={config.raceTime * 1000}
              key={currentIndex}
              running={running}
              onFinished={handleCountdownFinished}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
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
        progress={(currentIndex / operations.length) * 100}
        message={
          !showResult && !config.race
            ? "Appuies sur espace pour afficher le résultat"
            : (showResult && "Appuies sur espace pour continuer") || ""
        }
        onStop={() => {
          setStarted(false);
        }}
      />
    </Box>
  );
}

export default App;
