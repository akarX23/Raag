import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "full",
    borderRadius: "10px",
    border: "none !important",
    boxShadow: "0 0 3px 2px #000",
    height: "auto",
    position: "relative",
  },
  cardContent: {
    backgroundColor: "#343A40 !important",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "#D2D8DD",
    height: "100%",
  },
  tooltip: {
    maxWidth: "170px",
  },
}));

const UploadImageCard = ({ file, image, deleteImage, readonly }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(420));
  let name = null,
    type = null,
    size = null;
  if (file) {
    name = file.name;
    type = file.type;
    size = file.size;
  }

  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const getReadableFileSizeString = (fileSizeInBytes) => {
    var i = -1;
    var byteUnits = [" KB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setTouched(false);
        setHover(false);
      }}
    >
      <Card
        className={`${classes.root} ${!readonly && "cursor-pointer"}`}
        elevation={5}
        onClick={() => {
          if (!readonly) {
            if (mobile === true) {
              if (touched === true) {
                setTouched(false);
                setHover(false);
                deleteImage();
              } else {
                setHover(true);
                setTouched(true);
              }
            } else if (mobile === false) {
              deleteImage();
            }
          }
        }}
        onMouseOver={() => {
          if (!readonly) {
            setHover(true);
            setTooltip(true);
          } else {
            setHover(false);
          }
        }}
        onMouseOut={() => {
          setTooltip(false);
          if (!readonly) {
            setHover(false);
          }
        }}
      >
        <>
          <div className="w-full">
            <img
              src={image}
              className="w-full object-contain object-center bg-darktheme-500 h-48"
              alt="product_image_review"
            />
          </div>
          {file && (
            <CardContent className={classes.cardContent}>
              <Tooltip
                open={tooltip}
                title={name}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <div className="h-10 two-lines-truncate font-medium">
                  {name.substring(0, name.lastIndexOf("."))}
                </div>
              </Tooltip>
              <div className="border-b border-darktheme-600 w-full my-2"></div>
              <div className="font-sans w-full flex justify-between text-xs text-darktheme-400">
                <div className="flex items-center">
                  <PhotoSizeSelectActualIcon
                    style={{ fontSize: "0.8rem", marginRight: "5px" }}
                  />
                  <div className="uppercase font-semibold">
                    {type.substring(type.indexOf("/") + 1, type.length)}
                  </div>
                </div>
                <div className="font-italic font-semibold">
                  {getReadableFileSizeString(size)}
                </div>
              </div>
            </CardContent>
          )}

          {!readonly && (
            <div
              className={`absolute flex justify-center items-center inset-0 transition-all duration-200 ease-in bg-black ${
                hover === true
                  ? "bg-opacity-50 opacity-100"
                  : "bg-opacity-0 opacity-0"
              }`}
            >
              <DeleteIcon
                style={{
                  fontSize: 60,
                  color: "white",
                  marginTop: file ? "-40px" : "0",
                }}
              />
            </div>
          )}
        </>
      </Card>
    </ClickAwayListener>
  );
};

export default UploadImageCard;
