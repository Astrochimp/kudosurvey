import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/User.module.css";

const Users = ({ vote, users }) => {
  const userItem = users.filter((user) => user.id === vote);

  if (!userItem || !userItem[0]) {
    return null;
  }

  return (
    <div className={styles.avatar}>
      <Image
        src={userItem[0]?.avatarURL}
        width={25}
        height={25}
        alt={userItem[0].name}
      />
    </div>
  );
};

export default Users;
