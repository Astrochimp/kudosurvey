import React, { useEffect, useState } from "react";
import Link from "next/link";

const Users = ({ userList, userSelect }) => (
  <div>
    <h2>Login as</h2>
    <select onChange={(e) => userSelect(e)}>
      <option>Choose a user</option>
      {userList.map((user) => {
        return (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        );
      })}
    </select>

    <div>
      <Link href="/newuser">Create new user</Link>
    </div>
  </div>
);

export default Users;
