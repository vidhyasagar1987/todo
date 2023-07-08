import { render, screen } from "@testing-library/react";
import Todos from "./Todos";
import { Provider } from "react-redux";
import store from "../redux/Store/store";

test("link", () => {
  render(
    <Provider store={store}>
      {" "}
      <Todos />
    </Provider>
  );
  const linkElement = screen.getByText("ttt");
  expect(linkElement).toBeInTheDocument();
});
