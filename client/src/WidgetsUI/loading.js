import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import raaglogo from "../assets/images/raaglogo.png";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: 170,
    height: 170,
    color: "#1a202c",
    marginTop: 30,
  },
}));

const Loading = ({ showLoading }) => {
  const classes = useStyles();

  useEffect(() => {
    if (showLoading) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showLoading]);

  if (showLoading)
    return (
      <div className="flex inset-0 fixed z-50 flex-col items-center justify-center bg-darktheme-400">
        <img src={raaglogo} alt="loading" className="w-64 h-64" />
        <CircularProgress classes={{ root: classes.loading }} thickness={5} />
      </div>
    );
  else return null;
};

export default Loading;
