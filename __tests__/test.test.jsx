import React from "react";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  }),
);

describe("test function ", () => {
  test("test function", () => {
    const testFunction = () => {
      return 1;
    };
    expect(testFunction()).toBe(1);
  });
});
