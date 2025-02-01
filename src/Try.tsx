export default function Try() {
    //Type Annotations
    const num: number | undefined = 3;

    function sum(num1: number, num2: number): number {
        return num1 + num2;
    }

    //Interfaces
    interface Animal {
        name: string;
        age: number;
        makeSound(): void;
    }

    class Cat implements Animal {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        makeSound() {
            console.log('meeow');
        }
    }

    //another example of interfaces
    interface Point2 {
        x: number,
        y: number
    }

    interface Something {
        color: string,
        point: Point2
    }

    function func(fun: Something): void {
        console.log(fun.point.x);
    }

    //Type Aliases
    type nameOrAge = string | number;
    let age = 22;
    type Employee = { name: string } & { age: number };
    let employee = { name: "Batoul", age: age };

    //Enums
    enum Point { x, y, z };
    let xCorrdinate: Point = Point.x;

    //Generics
    function Identity<T>(arg: T): T {
        return arg;
    }

    let var1 = Identity<number>(4);
    let var2 = Identity("sd");

    //optional and Nullish Types
    let str1: string | undefined = undefined;
    let str2: string | undefined = "hello";

    interface User {
        name: string,
        certificates?: string[]
    }

    //Tuple
    let myTuple: [string, number] = ["Batoul", 962216822];

    type RGB = [number, number, number];
    function getRandomColor(): RGB {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return [r, g, b];
    }

    //any
    let anyVar: any = "45$";
    let arr: any[] = ["sd", 34, true];

    //Type Assertions : there is two ways to write it
    let myString: any = "this is my string";
    let var3: number = (myString as string).length;
    // let var4: number = (<string>myString).length;

    //Union Types
    let id: number | string = 123;
    function printID(id: string | number) {
        if (typeof id === "number")
            console.log("it is a number");
        else
            console.log("It is not a number");
    }

    //Insertion Types
    interface Color {
        color: string;
    }

    interface Size {
        size: number
    }

    type ColorAndSize = Color & Size;
    let someVar: ColorAndSize = {
        color: "red",
        size: 34
    }

    //Literal Types
    let direction: "north" | "south" | "east" | "west";
    direction = "north"; // Only these four strings are allowed
    // direction = "up"; // Error

    type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    let today: DaysOfWeek = "Monday";

    //Null and Undefined
    let potentiallyNull: string | null = null;
    // let length = potentiallyNull.length; // Error: Object is possibly 'null'.
    if (potentiallyNull !== null) {
        let length = potentiallyNull.length; // Okay, we've checked for null
    }

    let mightBeUndefined: string | undefined = undefined;

    return (
        <div>
            <p></p>
        </div>
    );
}