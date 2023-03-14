import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Register from "./Register";
import "./Register.css";
import { blueGrey } from "@mui/material/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
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
        SignUp
      </Button>

      <Dialog
        className="pop-reg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="pop-reg">
          <DialogTitle className="title">Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Register />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="popup-buttons">
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
