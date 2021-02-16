import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../lib/auth";

export async function getStaticProps(context) {
  const questions = await fetch(`http://localhost:3001/questions/`)
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      questions,
    },
    revalidate: 1,
  };
}

const ListPage = ({ questions }) => {
  const auth = useAuth();

  if (!auth.user) {
    return (
      <div>
        <h2>Sorry, you must choose a user first</h2>
      </div>
    );
  }

  if (!questions) {
    return (
      <div>
        <h2>Sorry, no questions exists</h2>
      </div>
    );
  }

  const doneQuestions = questions.filter((que) =>
    auth.user.answers.contains(que.id)
  );

  return (
    <div className={styles.container}>
      <h2>Would you rather?</h2>

      <h2>Questions</h2>

      <ul className="list">
        {questions.map((que) => {
          return (
            <li key={que.id}>
              <Link href={`/questions/${que.id}`}>
                <div className={styles.question}>
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

export default ListPage;
