import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AttachmentSharpIcon from "@material-ui/icons/AttachmentSharp";
import HistoryIcon from "@material-ui/icons/History";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  body: {
    // height: "auto",
  },
  icon: {
    color: "#D2D8DD",
    fontSize: 20,
    marginRight: 10,
  },
  delete: {
    outline: "none !important",
    border: "none !important",
    color: "#ecc94b",
    fontWeight: "600",
  },
}));

const PostPreview = ({ post, admin, deletePost }) => {
  const classes = useStyles();

  return (
    <div className="w-full bg-darktheme-900 rounded-lg">
      <a href={`/post/${post._id}`}>
        <div className="p-3 w-full">
          <h3 className="text-raag-100 font-sans">{post.title}</h3>
          <div className={`${classes.body} two-lines-truncate w-full`}>
            <p className="text-lg text-darktheme-300">{post.body}</p>
          </div>
        </div>
      </a>
      <div className="py-1 w-full border-b border-darktheme-600"></div>
      <div
        className={`w-full ${
          admin ? "justify-between" : "justify-start"
        } flex pt-2 pb-1 px-2 flex-wrap items-center`}
      >
        <div className="flex items-center mr-2">
          <AttachmentSharpIcon classes={{ root: classes.icon }} />
          <div className="text-raag-200 text-sm">
            {post.imageUrls.length + post.pdfUrls.length} attachments
          </div>
        </div>
        <div className="text-sm flex items-center text-darktheme-400">
          <HistoryIcon classes={{ root: classes.icon }} />
          {moment(post.updatedAt).fromNow()}
        </div>
        <Button classes={{ root: classes.delete }} onClick={deletePost}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostPreview;
