import React from "react";
import { render } from "@testing-library/react";
import Login from "../Login";

const userList = [
  {
    id: "rashmi",
    name: "Rashmi Manandhar",
    avatarURL: "/images/avatars/avataaars1.png",
    answers: [
      {
        am8ehyc8byjqgar0jgpub9: "optionTwo",
      },
      {
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      {
        vthrdm985a262al8qx3do: "optionTwo",
      },
      {
        xj352vofupe1dqz9emx13r: "optionTwo",
      },
    ],
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  {
    id: "julian",
    name: "Julian Manandhar",
    avatarURL: "/images/avatars/avataaars2.png",
    answers: [
      {
        vthrdm985a262al8qx3do: "optionOne",
      },
      {
        xj352vofupe1dqz9emx13r: "optionTwo",
      },
      {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
      },
      {
        "6ni6ok3ym7mf1p33lnez": "optionOne",
      },
      {
        am8ehyc8byjqgar0jgpub9: "optionOne",
      },
      {
        iJ9QruH: "optionOne",
      },
      {
        "4jfh3w6": "optionTwo",
      },
      {
        "5kFnTNM": "optionTwo",
      },
      {
        kIzCyd0: "optionTwo",
      },
      {
        loxhs1bqm25b708cmbf3g: "optionOne",
      },
    ],
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
];

test("renders deploy link", () => {
  const { getByText } = render(
    <Login userList={userList} userSelect={jest.fn()} />
  );
  const linkElement = getByText(/Create new user/);
  expect(linkElement).toBeInTheDocument();
});
