import React from "react";

import NewExpense from "../components/NewExpense/NewExpense";
import Expenses from "../components/Expenses/Expenses";
import NavBar from "../components/UI/NavBar";

const UserData = () => {
  return (
    <div>
      <NavBar />
      <NewExpense />
      <Expenses />
    </div>
  );
};

export default UserData;
