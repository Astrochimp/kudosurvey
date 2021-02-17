import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../lib/auth";

import styles from "../styles/User.module.css";

const User = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <div className={styles.user}></div>;
  }

  return (
    <div className={styles.user}>
      <div className={styles.avatarwrapper}>
        {auth.user?.avatarURL && (
          <Image
            src={auth.user?.avatarURL}
            width={50}
            height={50}
            alt={auth.user.name}
          />
        )}
      </div>
      <div className={styles.userbutton}>
        {auth?.user && <div>{auth.user.name}</div>}{" "}
      </div>
    </div>
  );
};

export default User;
