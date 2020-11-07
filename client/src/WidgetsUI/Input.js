import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({
  type,
  label,
  multiline,
  classes,
  value,
  onChange,
  placeholder,
  variant,
  error,
  rows,
}) => {
  return (
    <div className="flex w-full flex-col items-start">
      <div
        className={`text-darktheme-200 w-auto ${
          classes.label ? classes.label : "mb:text-xl"
        }`}
      >
        {label}
      </div>
      <div className={`w-full mt-2`}>
        <TextField
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          size="small"
          multiline={multiline}
          variant={variant ? variant : "outlined"}
          classes={{ root: classes.textField }}
          InputProps={{
            autoComplete: "new-password",
            type: type ? type : "text",
            classes: {
              root: classes.inputRoot,
              notchedOutline: classes.inputNotched,
            },
          }}
          rows={rows}
        />
      </div>
      <div
        className={`text-xs text-red-600 mb-2 mt-1 tracking-wider italic font-sans font-bold`}
      >
        {error}
      </div>
    </div>
  );
};

export default Input;
