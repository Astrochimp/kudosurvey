import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../lib/auth";
import User from "./User";
import Hamburger from "./Hamburger";

const Header = () => {
  const auth = useAuth();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const navigationClassName = isMenuOpen ? "menuvisible" : "menuhidden";

  return (
    <header className="main-header">
      <div className="header-wrapper">
        <Link href="/">
          <h1>Kudo Survey</h1>
        </Link>

        {auth.user && (
          <nav className={`dropdown ${navigationClassName}`}>
            <Link href="/">Questions</Link>
            <Link href="/new">New Question</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <div className="mainbutton" onClick={() => auth.signout()}>
              Signout
            </div>
          </nav>
        )}

        <User />

        <button className="navburger" onClick={toggleMenu}>
          <Hamburger />
        </button>
      </div>
    </header>
  );
};

export default Header;
