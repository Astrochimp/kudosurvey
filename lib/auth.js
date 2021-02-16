import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import Cookies from "js-cookie";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (user) => {
    if (user) {
      setUser(user);

      Cookies.set("kudo-survey-auth", true, {
        expires: 7,
      });

      setLoading(false);

      return user;
    } else {
      setUser(false);
      Cookies.remove("kudo-survey-auth");
      setLoading(false);

      return false;
    }
  };

  const updateUser = async (userId) => {
    return await fetch(`http://localhost:3001/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  };

  const signin = async (userId) => {
    setLoading(true);
    return await fetch(`http://localhost:3001/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        handleUser(user);
        Router.push("/");
      });
  };

  const signout = () => {
    Router.push("/");
    return handleUser(false);
  };

  return {
    user,
    loading,
    updateUser,
    signin,
    signout,
  };
}
