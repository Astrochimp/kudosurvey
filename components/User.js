import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../lib/auth";

import styles from "../styles/User.module.css";

const User = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <div>No user</div>;
  }

  return (
    <div className={styles.user}>
      <div>{auth?.user && <div>{auth.user.name}</div>} </div>

      {auth.user?.avatarURL && (
        <Image
          src={auth.user?.avatarURL}
          width={150}
          height={150}
          alt={auth.user.name}
        />
      )}

      <div onClick={() => auth.signout()}>Signout</div>
    </div>
  );
};

export default User;
