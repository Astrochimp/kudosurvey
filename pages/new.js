import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { useAuth } from "../lib/auth";

const NewQuestion = () => {
  const auth = useAuth();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  if (!auth.user) {
    return (
      <div>
        <h2>Sorry, you must choose a user first</h2>
      </div>
    );
  }

  const addQuestion = (event) => {
    event.preventDefault();

    const newQuestion = {
      author: auth.user.id,
      timestamp: Date.now(),
      optionOne: {
        votes: [],
        text: optionOne,
      },
      optionTwo: {
        votes: [],
        text: optionTwo,
      },
    };

    fetch(`http://localhost:3001/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        Router.push("/");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="container">
      <h2>Would you rather?</h2>

      <div className="form">
        <form onSubmit={(e) => addQuestion(e)}>
          <label htmlFor="optionone">
            <div className="formlabel">Option One</div>
            <input
              id="optionone"
              type="text"
              name="optionone"
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
              placeholder="Option One"
            />
          </label>
          <label htmlFor="fullname">
            <div className="formlabel">Option Two</div>
            <input
              id="optiontwo"
              type="text"
              name="optiontwo"
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
              placeholder="Option Two"
            />
          </label>

          <input type="submit" name="Add User" />
        </form>
      </div>
    </div>
  );
};

export default NewQuestion;
