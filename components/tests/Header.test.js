import React from "react";
import { fireEvent, wait, render, screen } from "@testing-library/react";
import Header from "../Header";
import { useAuth } from "../../lib/auth";

jest.mock("../../lib/auth");

describe("header", () => {
  test("renders title", async () => {
    useAuth.mockReturnValue({
      user: null,
    });

    const { getByText } = render(<Header />);
    const titleText = getByText(/Kudo survey/i);
    expect(titleText).toBeInTheDocument();
  });
});
