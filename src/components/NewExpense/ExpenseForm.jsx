import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { set, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { auth, db } from "../../firebase";
import { filterActions } from "../../store/filter";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const dd = new Date(enteredDate);
    dispatch(filterActions.setFilteredYear(dd.getFullYear()));
    const id = uuidv4();

    set(
      ref(
        db,
        `/${auth.currentUser.uid}/expenseData/${dd
          .getFullYear()
          .toString()}/${id}`
      ),
      {
        uuid: id,
        date: dd.toISOString(),
        title: enteredTitle,
        amount: +enteredAmount,
      }
    );

    props.onSaveExpenseData();
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.newExpense__controls}>
        <div className={classes.newExpense__control}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes.newExpense__control}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className={classes.newExpense__control}>
          <label>Date</label>
          <input
            type="date"
            min="2010-01-01"
            max={new Date().toISOString().slice(0, 10)}
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className={classes.newExpense__actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
