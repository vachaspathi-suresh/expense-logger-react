import { useState } from "react";

const useHelperText = () => {
  const [helperValue, setHelperValue] = useState("");
  const [isEnable, setIsEnable] = useState(false);

  const valueChangeHandler = (value) => {
    setHelperValue(value);
  };

  const showHelper = (value) => {
    setIsEnable(value);
  };

  return {
    value: helperValue,
    show: isEnable,
    valueChangeHandler,
    showHelper,
  };
};

export default useHelperText;
