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

export function speakOperation(
  operation: Operation,
  result: number | null = null
) {
  let text = `${operation.operands
    .map((operand) => (operand === 1 ? "un" : operand))
    .join(` ${operatorToText(operation.operator)} `)}`;

  if (result !== null) {
    text += ` ${result}`;
  }

  return speak(text);
}

export function speak(text: string) {
  return new Promise((resolve) => {
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fr-FR";
    msg.onend = resolve;

    window.speechSynthesis.speak(msg);
  });
}
