import React, { useEffect, useState } from "react";

import { useAuth } from "../lib/auth";
import Users from "../components/Users";
import List from "../components/List";

import styles from "../styles/Home.module.css";

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

const Home = ({ questions }) => {
  const [userList, setUserList] = useState([]);

  const auth = useAuth();

  const getUserList = async () => {
    const users_db = await fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => data);

    setUserList(users_db);
  };

  const userSelect = (e) => {
    auth.signin(e.target.value);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className={styles.container}>
      {auth?.user ? (
        <List questions={questions} user={auth.user} />
      ) : (
        <Users userList={userList} userSelect={userSelect} />
      )}
    </div>
  );
};

export default Home;
