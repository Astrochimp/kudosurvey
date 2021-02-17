import React, { useState, useReducer } from "react";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";

const Newuser = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarList = [
    "/images/avatars/avataaars.png",
    "/images/avatars/avataaars1.png",
    "/images/avatars/avataaars2.png",
    "/images/avatars/avataaars3.png",
    "/images/avatars/avataaars4.png",
    "/images/avatars/avataaars5.png",
  ];

  const addUser = (event) => {
    event.preventDefault();

    const errorState = false;

    if (!username) {
      errorState = true;
    }

    if (!fullname) {
      errorState = true;
    }

    if (!avatar) {
      errorState = true;
    }

    if (errorState) {
      return;
    }

    const newUser = {
      id: username,
      name: fullname,
      avatarURL: avatar,
      answers: [],
      questions: [],
    };

    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
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
      <h2>Create a new user</h2>

      <div className="form">
        <form onSubmit={(e) => addUser(e)}>
          <label htmlFor="username">
            <div className="formlabel">Username</div>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username no spaces, all lowercase"
            />
          </label>
          <label htmlFor="fullname">
            <div className="formlabel">Full Name</div>
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="You Full Name"
            />
          </label>

          <label htmlFor="avatar">
            <div className="formlabel">Avatar</div>

            <div className="avatarlist">
              {avatarList.map((ava) => (
                <div className="avatar" key={Math.random()}>
                  <Image src={ava} width={100} height={100} alt={ava} />
                  <input
                    type="radio"
                    name="avatar"
                    value={ava}
                    checked={avatar === ava}
                    onChange={(e) => {
                      setAvatar(e.target.value);
                    }}
                  />
                </div>
              ))}
            </div>
          </label>

          <input
            type="submit"
            name="submit"
            className="mainbutton"
            value="Add User"
          />
        </form>
      </div>
    </div>
  );
};

export default Newuser;
