import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Signin from "./Signin.js";
import Signout from "./Signout.js";
import {person} from '../App.js'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const usertoken=React.useContext(person)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        SignIn
      </Button>
      <Dialog
        className="pop-reg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="title">SignIn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {usertoken[0] ? <Signout /> : <Signin />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="popup-buttons">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
