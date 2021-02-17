import React from "react";
import Link from "next/link";
import { useAuth } from "../lib/auth";
import User from "./User";

const Header = () => {
  const auth = useAuth();

  return (
    <header className="main-header">
      <div className="header-wrapper">
        <Link href="/">
          <h1>Kudo Survey</h1>
        </Link>

        {auth.user && (
          <nav>
            <Link href="/">Questions</Link>
            <Link href="/new">New Question</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <div className="mainbutton" onClick={() => auth.signout()}>
              Signout
            </div>
          </nav>
        )}

        <User />
      </div>
    </header>
  );
};

export default Header;
