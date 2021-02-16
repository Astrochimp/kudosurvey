import React from "react";
import Link from "next/link";
import { useAuth } from "../lib/auth";
import User from "./User";

const Header = () => {
  const auth = useAuth();

  return (
    <header className="main-header">
      <Link href="/">
        <h1>Kudo Survey</h1>
      </Link>

      {auth.user && (
        <div>
          <Link href="/new">Create new question</Link>
          <Link href="/leaderboard">Leaderboard</Link>
        </div>
      )}

      <User />
    </header>
  );
};

export default Header;
