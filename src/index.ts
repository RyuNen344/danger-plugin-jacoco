console.log("Hello!");
console.log("Hello!");
console.log("Hello!Hoge");

const profile = { name: "soarflat", sex: "male", location: "Tokyo" };

const fooBar = (a: number, b: string, c: typeof profile) => {
    console.log(a);
    console.log(b);
    console.log(c);
};

fooBar(111, "hoge!", profile);

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person): string {
    return "Hello, " + person.firstName + " " + person.lastName;
}
