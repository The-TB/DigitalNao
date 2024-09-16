import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDataTypes(): any {
    
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

    let data = {
      age: age,
      name: fullName,
      isActive: isActive,
      score: scores,
      person: person,
      status: Status[connection],
      random: randomValue,
      identifier: identifier,
      employee: newEmployee,
      fruits: fruits,
      map: Array.from(mapExample.entries())
    };

    return data;
  }
}
