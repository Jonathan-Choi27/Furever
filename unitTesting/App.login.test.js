<<<<<<< HEAD
import React from "react";
import renderer from "react-test-renderer";
import Login from "../app/views/login/login";

describe("<Login />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
=======
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
>>>>>>> e2304ec5dac3aa3d06593d8ba9680f4ae3c3d50b
