import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";

import { auth, db } from "../../firebase";
import classes from "./ExpensesFilter.module.css";
import { filterActions } from "../../store/filter";

const ExpensesFilter = () => {
  const dispatch = useDispatch();
  const filteredValue = useSelector((state) => state.filter.filteredYear);
  const [years, setYears] = useState([new Date().getFullYear()]);

  useEffect(() => {
    onValue(ref(db, `/${auth.currentUser.uid}/expenseData`), (snapShot) => {
      const data = snapShot.val();
      if (data) {
        const minYear = Math.min(...Object.keys(data));
        const maxYear = Math.max(...Object.keys(data));
        setYears([
          ...Array.from(
            { length: maxYear - minYear + 1 },
            (v, k) => k + minYear
          ),
        ]);
        dispatch(filterActions.setFilteredYear(maxYear));
      }
    });
  }, [dispatch]);

  const dropdownChangeHandler = (event) => {
    dispatch(filterActions.setFilteredYear(event.target.value));
  };

  return (
    <div className={classes.expensesFilter}>
      <div className={classes.expensesFilter__control}>
        <label>Filter by year</label>
        <select value={filteredValue} onChange={dropdownChangeHandler}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
