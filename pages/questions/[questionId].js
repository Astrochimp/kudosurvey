import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../../lib/auth";
import GetUser from "../../components/GetUser";

import styles from "../../styles/Question.module.css";

export async function getStaticProps(context) {
  const questionId = context.params.questionId;
  const question = await fetch(`http://localhost:3001/questions/${questionId}`)
    .then((res) => res.json())
    .then((data) => data);

  const users = await fetch(`http://localhost:3001/users/`)
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      questionId,
      originalQuestion: question,
      users,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const questions = await fetch(`http://localhost:3001/questions`)
    .then((res) => res.json())
    .then((data) => data);

  const paths = questions.map((question) => ({
    params: {
      questionId: question.id.toString(),
      question: question,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const QuestionPage = ({ originalQuestion, questionId, users }) => {
  const auth = useAuth();

  const [question, setQuestion] = useState(originalQuestion);

  if (!auth.user) {
    return (
      <div>
        <h2>Sorry, you must choose a user first</h2>
      </div>
    );
  }

  if (!question) {
    return (
      <div>
        <h2>Sorry, no question exists</h2>
      </div>
    );
  }

  const vote = async ({ choice, question, user }) => {
    if (answers.length >= 1) {
      console.log("sorry, you voted");
      return;
    }

    const votes = [...question[choice].votes, user.id];

    const updatedQuestion = {
      ...question,
      [choice]: {
        ...question[choice],
        votes: votes,
      },
    };

    await fetch(`http://localhost:3001/questions/${question.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
      })
      .catch((err) => {
        console.log("error", err);
      });

    const newAnswers = {
      [`${question.id}`]: choice,
    };

    const updatedUserQuestion = {
      ...user,
      answers: [...user.answers, newAnswers],
    };

    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("user updated", data);
        auth.updateUser(data.id);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const answers = auth.user.answers.filter((answers) => {
    if (Object.keys(answers)[0] === question.id) {
      return Object.values(answers)[0];
    }
  });

  const chosenOption = answers.length > 0 ? Object.values(answers[0])[0] : "";

  return (
    <div className={styles.container} key={question.id}>
      <h2>Would you rather?</h2>

      <div className="author">
        Created by
        <GetUser vote={question.author} users={users} />
        <div>{question.author}</div>
      </div>
      <h3
        className={styles.vote}
        onClick={() => vote({ choice: "optionOne", question, user: auth.user })}
      >
        {chosenOption === "optionOne" && (
          <span aria-roledescription="image">✅</span>
        )}{" "}
        {question.optionOne.text}
      </h3>
      <div>
        votes:{question.optionOne.votes.length}
        <div className={styles.votelist}>
          {question.optionOne.votes.map((vote) => (
            <div key={Math.random()}>
              <GetUser vote={vote} users={users} />
            </div>
          ))}
        </div>
      </div>
      <h3
        className={styles.vote}
        onClick={() => vote({ choice: "optionTwo", question, user: auth.user })}
      >
        {chosenOption === "optionTwo" && (
          <span aria-roledescription="image">✅</span>
        )}{" "}
        {question.optionTwo.text}
      </h3>
      <div>
        votes: {question.optionTwo.votes.length}
        <div className={styles.votelist}>
          {question.optionTwo.votes.map((vote) => (
            <div key={Math.random()}>
              <GetUser vote={vote} users={users} />
            </div>
          ))}
        </div>
      </div>

      {answers.length > 0 && (
        <div className="you-voted">
          <h4>
            <span aria-roledescription="image">⭐️</span>
            You voted!
            <span aria-roledescription="image">⭐️</span>
          </h4>

          <div>
            <Link className="mainbutton" href="/">
              Question List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
