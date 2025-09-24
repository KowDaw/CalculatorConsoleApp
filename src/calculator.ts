import readlineSync from "readline-sync";
import { PossibleInputs } from "./enums.js";

// Global Variables

const validMathOperators: string[] = ["+", "-", "*", "/", "%"];

// App

runCalculatorApp();

// Functions

function runCalculatorApp(): void {
    displayMessage("App is running!");

    let input: string = getInputFromUser("Would you like to do a math operation?\n[ type 'Y' to yes or 'N' to quit ]\n");
    let isStarterInputValid: boolean = validateInput(input, PossibleInputs.YesOrNo);

    while (!isStarterInputValid) {
        input = getInputFromUser("Invalid answer! Try again!");
        isStarterInputValid = validateInput(input, PossibleInputs.YesOrNo);
    }

    while (input.toUpperCase() === "Y") {
        const datasForOperation: string[] = collectInputsFromUserForMathOperation();
        const result: number = doMathOperation(datasForOperation);
        
        displayResult(datasForOperation, result);

        input = getInputFromUser("Would you like to do another math operation?\n[ type 'Y' to yes or 'N' to quit ]\n");
        isStarterInputValid = validateInput(input, PossibleInputs.YesOrNo);
    }

    displayMessage("Ok, bye-bye!");
}

function displayMessage(message: string): void {
    console.log(message);
}

function displayResult(datasForOperation: string[], result: number): void {
    displayMessage(`${datasForOperation[0]} ${datasForOperation[1]} ${datasForOperation[2]} = ${result}`);
}

function getInputFromUser(message: string): string {
    return readlineSync.question(message);
}

function validateInput(input: string, inputType: PossibleInputs): boolean {
    switch (inputType) {
        case PossibleInputs.Number:
            return !isNaN(parseInt(input))
        case PossibleInputs.MathOperator:
            return validMathOperators.includes(input);
        default:
            return input.toUpperCase() === "Y" || input.toUpperCase() === "N";
    }
}

function collectInputsFromUserForMathOperation(): string[] {
    const datasForOperation: string[] = [];

    for (let i = 1; i <= 3; i++) {
        let input: string = "";
        let isInputValid: boolean = false;
        let message: string = "";

        if (i % 2 === 1) {
            message = i === 1 ? "Enter a number:\n" : "Enter another number:\n";
            input = getInputFromUser(message);
            isInputValid = validateInput(input, PossibleInputs.Number);
        } else {
            message = "Enter the operator!";
            input = getInputFromUser(message);
            isInputValid = validateInput(input, PossibleInputs.MathOperator);
        }

        while (!isInputValid) {
            if (i % 2 === 1) {
                input = getInputFromUser("Invalid number input! Try again!");
                isInputValid = validateInput(input, PossibleInputs.Number);
            } else {
                input = getInputFromUser("Invalid operator input! Try again!");
                isInputValid = validateInput(input, PossibleInputs.MathOperator);
            }
        }

        datasForOperation.push(input);
    }

    return datasForOperation;
}

function doMathOperation(datasForOperation: string[]): number {
    const numberA: number = parseInt(datasForOperation[0]);
    const operator: string = datasForOperation[1];
    const numberB: number = parseInt(datasForOperation[2]);

    switch (operator) {
        case "+":
            return add(numberA, numberB);
        case "-":
            return subtract(numberA, numberB);
        case "*":
            return multiply(numberA, numberB);
        case "/":
            return divide(numberA, numberB);
        default:
            return checkRemaining(numberA, numberB);
    }
}

function add(a: number, b: number): number {
    return a + b;
}

function subtract(a: number, b: number): number {
    return a - b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

function divide(a: number, b: number): number {
    return a / b;
}

function checkRemaining(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division by zero is not possible!");
    }
    return a % b;
}

/*
Calculator App

Step 1: npm install readline-sync
Step 2: npm install @types/readline-sync
*/