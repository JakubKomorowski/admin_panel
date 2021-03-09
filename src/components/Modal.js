import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal as MaterialModal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddProductForm from "./AddProductForm";
import DisplayProductsOrder from "./productsComponents/DisplayProductsOrder";
import EditOrder from "./EditOrder";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 5, 4),
    outline: "none",
    active: "none",
    overflow: "auto",
    maxHeight: "90%",
  },
}));

const Modal = ({ open, handleClose, modalType }) => {
  const classes = useStyles();

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {modalType === "addProduct" ? (
            <AddProductForm />
          ) : modalType === "showProduct" ? (
            <DisplayProductsOrder />
          ) : (
            <EditOrder handleClose={handleClose} />
          )}
        </div>
      </Fade>
    </MaterialModal>
  );
};

export default Modal;
