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

  test("renders user menu", async () => {
    useAuth.mockReturnValue({
      user: {
        id: "julian",
        name: "Julian Manandhar",
        avatarURL: "",
        answers: {
          vthrdm985a262al8qx3do: "optionOne",
          xj352vofupe1dqz9emx13r: "optionTwo",
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
      },
    });

    const { getByText } = render(<Header />);
    const titleText = getByText(/Leaderboard/i);
    expect(titleText).toBeInTheDocument();
  });
});
