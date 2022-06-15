import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";

import { auth, db } from "../../firebase";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const [expenses, setexpenses] = useState([]);
  const filteredYear = useSelector((state) => state.filter.filteredYear);

  useEffect(() => {
    onValue(
      ref(db, `/${auth.currentUser.uid}/expenseData/${filteredYear}`),
      (snapShot) => {
        setexpenses([]);
        const data = snapShot.val();
        if (data) {
          Object.values(data).map((exp) =>
            setexpenses((prev) => [...prev, exp])
          );
        }
      }
    );
  }, [filteredYear]);

  return (
    <div>
      <Card className={classes.expenses}>
        <ExpensesFilter />
        <ExpensesChart expenses={expenses} />
        <ExpensesList items={expenses} />
      </Card>
    </div>
  );
};

export default Expenses;
