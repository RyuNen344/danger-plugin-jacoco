import greet from "@/greet"

describe("should say fugafuga", () => {
    test('should say hello to Tom.', () => {
        let response = greet('Tom');
        expect(response).toBe('Hello, Tom!');
    })
});
