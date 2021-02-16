import React, { useState } from "react";
import Link from "next/link";

const List = ({ questions, user }) => {
  if (!questions) {
    return (
      <div>
        <h2>Sorry, no questions exists</h2>
      </div>
    );
  }

  if (user && user.answers) {
    const doneQuestions = questions.filter((que) => {
      user.answers.filter((ans) => console.log(ans, que.id));
    });

    console.log({ doneQuestions });
  }

  return (
    <div className="container">
      <h2>Would you rather?</h2>

      <h2>Questions</h2>

      <ul className="list">
        {questions.map((que) => {
          const questionDone = user.answers.filter(
            (ans) => Object.keys(ans)[0] === que.id
          );

          return (
            <li key={que.id}>
              <Link href={`/questions/${que.id}`}>
                <div className="question">
                  {questionDone.length > 0 && (
                    <div>
                      <span aria-roledescription="image">⭐️</span>
                    </div>
                  )}
                  {que.optionOne.text}/ {que.optionTwo.text}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
