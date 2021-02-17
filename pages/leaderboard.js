import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../lib/auth";

export async function getStaticProps(context) {
  const questions = await fetch(`http://localhost:3001/questions/`)
    .then((res) => res.json())
    .then((data) => data);

  const users = await fetch(`http://localhost:3001/users/`)
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      questions,
      users,
    },
    revalidate: 1,
  };
}

const Leaderboard = ({ questions, users }) => {
  const auth = useAuth();
  const [userlist, setUserlist] = useState([]);
  const [sortType, setSortType] = useState("answers");

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

  useEffect(() => {
    const sortUsers = ({ type }) => {
      const sorted = users.sort((a, b) => b[type].length - a[type].length);

      setUserlist(sorted);
    };

    sortUsers({ type: sortType });
  }, [sortType]);

  return (
    <div className="container">
      <h2>Leaderboard</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>
              <div
                title="Sort by top Answers"
                className="tablesort"
                onClick={() => setSortType("questions")}
              >
                Answers
              </div>
            </th>
            <th>
              <div
                title="Sort by top Questions"
                className="tablesort"
                onClick={() => setSortType("answers")}
              >
                Questions
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((person) => {
            return (
              <tr key={Math.random()}>
                <td>
                  <Image
                    src={person?.avatarURL}
                    width={50}
                    height={50}
                    alt={person.name}
                  />
                </td>
                <td>
                  <h3>{person.name}</h3>
                </td>
                <td>{person.answers.length}</td>
                <td>{person.questions.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option 1</th>
            <th>Option 2</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((que) => {
            return (
              <tr key={que.id}>
                <td>
                  <Link href={`/questions/${que.id}`}>
                    <div className="question">
                      {que.optionOne.text} / {que.optionTwo.text}
                    </div>
                  </Link>
                </td>
                <td>{que.optionOne.votes.length}</td>
                <td>{que.optionTwo.votes.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
