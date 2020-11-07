import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const useStyles = makeStyles((theme) => ({
  navigate: {
    color: "#fff",
    padding: 0,
    outline: "none !important",
    border: "none !important",
  },
  icon: {
    fontSize: 40,
    padding: 0,
  },
}));

const PdfDisplay = ({ pdf, deleteFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const classes = useStyles();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    if (pageNumber + offset <= numPages && pageNumber + offset >= 1)
      setPageNumber(pageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="my-5">
      <div className="bg-darktheme-800 rounded-lg flex justify-between items-center sm:hidden">
        <div className="flex justify-between w-full items-center p-3">
          <div className="text-darktheme-200 text-2xl flex">
            <PictureAsPdfIcon classes={{ root: classes.icon }} />
            <div className="ml-2">{pdf.name}</div>
          </div>
          <IconButton
            classes={{ root: classes.navigate }}
            onClick={() => deleteFile()}
          >
            <DeleteIcon classes={{ root: classes.icon }} />
          </IconButton>
        </div>
      </div>
      <div className="w-full sm:flex flex-col items-center justify-center hidden">
        <div className="flex justify-between w-full items-center pb-2 mb-4 border-b border-darktheme-500">
          <div className="text-darktheme-200 text-2xl flex">
            <PictureAsPdfIcon classes={{ root: classes.icon }} />
            <div className="ml-2">
              {pdf.name.substring(0, pdf.name.lastIndexOf("."))}
            </div>
          </div>
          <IconButton
            classes={{ root: classes.navigate }}
            onClick={() => deleteFile()}
          >
            <DeleteIcon classes={{ root: classes.icon }} />
          </IconButton>
        </div>
        <Document
          file="https://res.cloudinary.com/b2me/image/upload/v1604722438/productImages/urjoa8pac3rltvialpkn.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="text-darktheme-200 font-sans text-center flex mt-2 items-center font-medium">
          <IconButton
            classes={{ root: classes.navigate }}
            onClick={previousPage}
          >
            <ChevronLeftIcon classes={{ root: classes.icon }} />
          </IconButton>
          <div>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <IconButton classes={{ root: classes.navigate }} onClick={nextPage}>
            <ChevronRightIcon classes={{ root: classes.icon }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PdfDisplay;
