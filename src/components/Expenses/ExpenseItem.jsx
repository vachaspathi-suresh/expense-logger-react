import React from "react";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import classes from "./ExpenseItem.module.css";
import { ref, remove } from "firebase/database";
import { auth, db } from "../../firebase";

const ExpenseItem = (props) => {
  const deleteHandler = () => {
    remove(
      ref(
        db,
        `/${auth.currentUser.uid}/expenseData/${new Date(props.date)
          .getFullYear()
          .toString()}/${props.uuid}`
      )
    );
  };

  return (
    <li>
      <Card className={classes.expenseItem}>
        <ExpenseDate date={props.date} />
        <div className={classes.expenseItem__description}>
          <h2>{props.title}</h2>
          <div className={classes.expenseItem__price}>${props.amount}</div>
          <IconButton
            size="large"
            sx={{ color: "#2C0000" }}
            onClick={deleteHandler}
          >
            <DeleteForeverIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
