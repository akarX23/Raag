import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createPost, clearPostActions } from "../../actions/postActions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import Input from "../../WidgetsUI/Input";
import UploadImageCard from "../../WidgetsUI/uploadImageCard";
import PdfDisplay from "../../WidgetsUI/PdfDisplay";
import Loading from "../../WidgetsUI/loading";

const styles = (theme) => ({
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
  label: {
    marginTop: 20,
  },
  upload: {
    width: "150px",
    outline: "none !important",
    border: "none !important",
  },
});

class CreatePost extends Component {
  state = {
    values: {
      title: "",
      body: "",
    },
    errors: {
      title: "",
      body: "",
    },
    imageFiles: [],
    images: [],
    pdf: [],
    loading: false,
    alertMessage: "",
    severity: "",
    showAlert: false,
  };

  handleInputChange = (inputName, value) => {
    let newValues = { ...this.state.values };
    let newErrors = { ...this.state.errors };
    newErrors[inputName] = this.validateInput(inputName, value);
    newValues[inputName] = value;

    this.setState({ values: newValues, errors: newErrors });
  };

  onChangeFiles = (event) => {
    const files = [...event.target.files];
    const imageFiles = [],
      pdf = [];

    const imageTypes = ["image/png", "image/jpeg", "image/gif"];

    files.forEach((file) => {
      if (imageTypes.includes(file.type)) imageFiles.push(file);
      if (file.type === "application/pdf") pdf.push(file);
    });

    this.getImagePreviews(imageFiles, pdf);
  };

  getImagePreviews = (imageFiles, pdf) => {
    let imagePreviews = [];
    if (imageFiles.length === 0) {
      this.setState({ pdf: [...this.state.pdf, ...pdf] });
      return;
    }

    imageFiles.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.push(reader.result);
      };
      reader.onloadend = () => {
        if (i === imageFiles.length - 1) {
          this.setState({
            imageFiles: [...this.state.imageFiles, ...imageFiles],
            pdf: [...this.state.pdf, ...pdf],
            images: [...this.state.images, ...imagePreviews],
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  handleDeleteImage = (index) => {
    let newFiles = [...this.state.imageFiles];
    let newImages = [...this.state.images];

    newFiles = newFiles.filter((file, i) => i !== index);
    newImages = newImages.filter((image, i) => i !== index);

    this.setState({ images: [...newImages], imageFiles: [...newFiles] });
  };

  handleDeletePDF = (index) => {
    let newpdf = [...this.state.pdf];

    newpdf = newpdf.filter((pdf, i) => i !== index);

    this.setState({ pdf: [...newpdf] });
  };

  validateInput = (inputName, value) => {
    if (inputName === "title" && value === "") return "*This field is required";
  };

  uploadDocuments = () => {
    this.setState({ loading: true }, () => {
      const {
        values: { title, body },
        imageFiles,
        pdf,
      } = this.state;
      this.props.createPost({
        title,
        body,
        imageFiles,
        pdfFiles: pdf,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    let severity = "",
      alertMessage = "",
      showAlert = false;
    if (nextProps.post.postAction) {
      if (nextProps.post.postAction.success === false) {
        showAlert = true;
        alertMessage = "Something went wrong!";
        severity = "error";
        this.setState({ showAlert, alertMessage, severity, loading: false });
      } else if (nextProps.post.postAction.postAdded === true) {
        this.props.history.push("/admin");
      }
    }
  }

  componentWillUnmount() {
    this.props.clearPostActions();
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      errors,
      imageFiles,
      images,
      pdf,
      loading,
      showAlert,
      alertMessage,
      severity,
    } = this.state;

    return (
      <div className="py-3 px-4">
        <h1 className="text-darktheme-300 pb-2 border-b mb-3 border-darktheme-500">
          Create Post
        </h1>
        <div className="w-full flex justify-end">
          <Button
            color="secondary"
            variant="contained"
            classes={{ root: classes.upload }}
            component="span"
            onClick={this.uploadDocuments}
          >
            Create post
          </Button>
        </div>
        <div className="mx-auto w-full sm:w-4/5">
          <Input
            label="Title"
            classes={classes}
            value={values.title}
            error={errors.title}
            onChange={(event) =>
              this.handleInputChange("title", event.target.value)
            }
          />
          <Input
            label="Body"
            classes={classes}
            multiline={true}
            rows={4}
            value={values.body}
            error={errors.body}
            onChange={(event) =>
              this.handleInputChange("body", event.target.value)
            }
          />

          <div className="mt-3 w-full">
            <input
              className="hidden"
              id="postFiles"
              multiple
              type="file"
              onChange={(event) => this.onChangeFiles(event)}
            />
            <label htmlFor="postFiles">
              <Button
                color="primary"
                variant="contained"
                classes={{ root: classes.upload }}
                component="span"
              >
                Upload Files
              </Button>
            </label>
          </div>
          <div className="mx-auto mt-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {imageFiles.map((file, i) => {
              return (
                <UploadImageCard
                  key={i}
                  file={file}
                  image={images[i]}
                  deleteImage={() => this.handleDeleteImage(i)}
                />
              );
            })}
          </div>
          <div className="w-full">
            {pdf.map((file, i) => (
              <div key={i} className="w-full">
                <PdfDisplay
                  pdf={file}
                  deleteFile={() => this.handleDeletePDF(i)}
                />
              </div>
            ))}
          </div>
        </div>
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => this.setState({ showAlert: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            onClose={() => this.setState({ showAlert: false })}
            severity={severity}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <Loading showLoading={loading} />;
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ createPost, clearPostActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreatePost));
