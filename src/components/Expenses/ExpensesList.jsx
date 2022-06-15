import React from "react";

import ExpenseItem from "./ExpenseItem";
import classes from "./ExpensesList.module.css";

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return (
      <h2 className={classes.expensesList__fallback}>Found no expenses.</h2>
    );
  }

  return (
    <ul className={classes.expensesList}>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.uuid}
          uuid={expense.uuid}
          title={expense.title}
          amount={expense.amount}
          date={new Date(expense.date)}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
