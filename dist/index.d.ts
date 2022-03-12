declare const profile: {
    name: string;
    sex: string;
    location: string;
};
declare const fooBar: (a: number, b: string, c: typeof profile) => void;
interface Person {
    firstName: string;
    lastName: string;
}
declare function greeter(person: Person): string;
//# sourceMappingURL=index.d.ts.map