import React from "react";
import renderer from "react-test-renderer";
import Login from "../app/views/login/login";
jest.useFakeTimers();

describe("<Login />", () => {
  jest.useFakeTimers()
  it("has 1 child", () => {
    const tree = renderer.create(<Login />).toJSON();
    console.log("HEY" + tree.children.length);
    expect(tree.children.length).toBe(1);
  });
});
