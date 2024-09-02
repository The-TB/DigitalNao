
let age: number = 30;
let fullName: string = "Juan Escobedo";
let isActive: boolean = true;
let scores: number[] = [85, 90, 78];
let person: [string, number] = ["Ana", 25];
let notDefined: undefined = undefined;
let empty: null = null;

enum Status {
  Enabled,
  Disabled,
}
let connection: Status = Status.Enabled;

let randomValue: any = 10;
randomValue = "Hello";
randomValue = true;

let unknownValue: unknown;
unknownValue = "Tipo unknown pasa a tipo string";
unknownValue = 42;

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}

let identifier: number | string;
identifier = 101;
identifier = "202A";

interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: number;
}

type EmployeePerson = Person & Employee;

let newEmployee: EmployeePerson = {
  name: "Carlos",
  age: 40,
  employeeId: 1234,
};


let fruits: string[] = ["manzana", "naranja", "banana"];

let mapExample: Map<string, number> = new Map();
mapExample.set("uno", 1);
mapExample.set("dos", 2);

let list: Array<number> = [10, 20, 30];

function printValues() {
  console.log(`Age: ${age}, Name: ${fullName}, Is Active: ${isActive}`);
  console.log(`Scores: ${scores}`);
  console.log(`Person: ${person}`);
  console.log(`Status: ${Status[connection]}`);
  console.log(`Random Value (any): ${randomValue}`);
  console.log(`Identifier (union): ${identifier}`);
  console.log(`EmployeePerson (intersection): ${JSON.stringify(newEmployee)}`);
  console.log(`Fruits: ${fruits}`);
  console.log(`Map: ${JSON.stringify(Array.from(mapExample.entries()))}`);
}

printValues();
