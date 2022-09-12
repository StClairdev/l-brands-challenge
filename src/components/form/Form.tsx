import React, { useState } from "react";
import Input from "../input/Input";
import "../../App.css";

interface StringKey<T> {
  [key: string]: T;
}

const VALIDATION_ERRORS = {
  EMAIL: {
    INVALID_EMAIL: "invalid-email",
    ALREADY_EXIST: "already-exist",
  },
  USERNAME: {
    USERNAME_LENGTH: "username-length",
  },
};

export function Form() {

  const {
    EMAIL: { INVALID_EMAIL, ALREADY_EXIST },
    USERNAME: { USERNAME_LENGTH },
  } = VALIDATION_ERRORS;

  const [formValue, setFormValue] = useState({
    email: "",
    username: "",
  });
  const formNotComplete = Object.values(formValue).some(
    (value) => value === ""
  );

  const [errors, setErrors] = useState({
    email: "",
    username: "",
  });
  const hasValidationErrors = Object.values(errors).some((value) => value);

  const submitDisabled = formNotComplete || hasValidationErrors;

  const errorMap: StringKey<{ [key: string]: string }> = {
    email: {
      [INVALID_EMAIL]: "* Please enter a valid email address.",
      [ALREADY_EXIST]: "* Email address already in use.",
    },
    username: {
      [USERNAME_LENGTH]: "* Please enter a username.",
    },
  };

  const setErrorProp = (name: string, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange =
    (
      validation: (value: string) => { passed: boolean; failureReason: string }
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // handle validation
      const { passed, failureReason } = validation(value);

      console.log(passed, failureReason);
      if (!passed) setErrorProp(name, errorMap[name][failureReason]);
      else setErrorProp(name, "");

      setFormValue((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    };

  const handleUsernameValidation = (value: string) => {
    let passed = false;
    let failureReason = "";

    if (value.length > 0) {
      passed = true;
    } else {
      failureReason = USERNAME_LENGTH;
    }

    return {
      passed,
      failureReason,
    };
  };
  const handleUsernameChange = handleInputChange(handleUsernameValidation);

  const handleEmailValidation = (value: string) => {
    const returnObj = {
      failureReason: "",
      passed: false,
    };

    // validate if valid email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (emailRegex.test(value)) {
      returnObj.passed = true;
    } else {
      returnObj.failureReason = INVALID_EMAIL;
    }

    if (returnObj.failureReason === INVALID_EMAIL) {
      // check if user exist in api
      const fakeAPIUserExistCheck = false;

      // if user exist set validation failure reason to already-exist
      if (fakeAPIUserExistCheck) {
        returnObj.failureReason = ALREADY_EXIST;
        returnObj.passed = false;
      }
    }

    return returnObj;
  };

  const handleEmailChange = handleInputChange(handleEmailValidation);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
        <form className="addUserForm" onSubmit={handleSubmit}>
          <h1 className="addUserFormHeader">Sign up!</h1>
          <Input
            className="input"
            name={"username"}
            handleValidation={handleUsernameChange}
            label={"Username"}
            placeholder={"username"}
            value={formValue.username}
            error={errors.username}
          />
          <Input
            className="input"
            name={"email"}
            handleValidation={handleEmailChange}
            label={"Email"}
            placeholder={"email"}
            value={formValue.email}
            error={errors.email}
          />
          <button
            id="submitButton"
            type="submit"
            value="submit"
            disabled={submitDisabled}
          >
            SUBMIT
          </button>
        </form>
    </>
  );
}

export default Form;
