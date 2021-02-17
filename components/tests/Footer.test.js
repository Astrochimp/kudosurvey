import React from "react";
import { fireEvent, wait, render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  test("renders title", async () => {
    const { getByText } = render(<Footer />);
    const titleText = getByText(/Kudo survey/i);
    expect(titleText).toBeInTheDocument();
  });
});
