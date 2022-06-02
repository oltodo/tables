import { Operation } from "../types";

function operatorToText(operator: Operation["operator"]): string {
  switch (operator) {
    case "+":
      return "plus";
    case "-":
      return "moins";
    case "x":
      return "fois";
    case "/":
      return "divisé par";
  }

  return "";
}

function getVoice(): SpeechSynthesisVoice | undefined {
  return window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang === "fr-FR");
}

// Force the browser to load voices
getVoice();

export function speakOperation(
  operation: Operation,
  result: number | null = null
) {
  let text = `${operation.operands.join(
    ` ${operatorToText(operation.operator)} `
  )}`;

  if (result !== null) {
    text += ` ${result}`;
  }

  return speak(text);
}

export function speak(text: string) {
  return new Promise((resolve) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.onstart = resolve;
    msg.rate = 1.3;

    const voice = getVoice();
    if (voice) {
      msg.voice = voice;
    }

    window.speechSynthesis.speak(msg);
  });
}
