import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Input from "../WidgetsUI/Input";

const useStyles = makeStyles((theme) => ({
  addUser: {
    backgroundColor: "#343A40",
  },
  addUserSubmit: {
    color: "#4fd1c5",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "2px",
    outline: "none !important",
    border: "none !important",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05) !important",
    },
  },
  textField: {
    backgroundColor: "#202428",
    borderRadius: "5px",
    width: "100%",
  },
  inputRoot: {
    color: "white",
    fontSize: "17px",
    fontFamily: "sans",
  },
}));

const AddUser = ({ openDialogue, closeDialogue, submitUser }) => {
  const classes = useStyles();

  const [values, setvalues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (inputName, value) => {
    const newValues = { ...values };
    const newErrors = { ...errors };

    newValues[inputName] = value;
    newErrors[inputName] = validateInputs(inputName, value);
    setvalues({ ...newValues });
    setErrors({ ...newErrors });
  };

  const validateInputs = (inputName, value) => {
    if (value.length <= 0) return "*This field is required";
    if (
      inputName === "email" &&
      !RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(value)
    )
      return "Email is not valid";
    if (inputName === "password" && value.length < 5)
      return "Password too short";
    return "";
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let newErrors = { ...errors };
    let formValid = true;

    Object.keys(values).forEach((key) => {
      if (values[key] === "") newErrors[key] = "*This field is required";
      if (newErrors[key] !== "" || values[key] === "") formValid = false;
    });

    if (!formValid) setErrors({ ...newErrors });
    else {
      submitUser(values);
    }
  };

  return (
    <Dialog
      open={openDialogue}
      onClose={closeDialogue}
      classes={{ paper: classes.addUser }}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <DialogContent>
          <Input
            label="Name"
            classes={classes}
            value={values.name}
            error={errors.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
          />
          <Input
            label="Email"
            classes={classes}
            value={values.email}
            error={errors.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
          <Input
            label="Password"
            type="password"
            classes={classes}
            value={values.password}
            error={errors.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button classes={{ root: classes.addUserSubmit }} type="submit">
            Add
          </Button>
          <Button
            classes={{ root: classes.addUserSubmit }}
            onClick={closeDialogue}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUser;
