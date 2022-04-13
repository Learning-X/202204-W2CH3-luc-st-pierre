const sum = (a, b) => a + b;

describe("Given the function sum", () => {
  describe("When two numbers are added together", () => {
    test("Then it should return the sum of those two numbers", () => {
      const num1 = 8;
      const num2 = 8;
      const expectedResult = 16;

      const result = sum(num1, num2);

      expect(result).toBe(expectedResult);
    });
  });
});
