import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import BoardType from "@/types/client/board/board";
import { useSocket } from "@/components/contexts/socket";
import getAuthCookie from "@/clientlib/getAuthCookie";
import { FC } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  board: BoardType;
};

const DeleteModal: FC<Props> = ({ open, onClose, board }) => {
  const { socket } = useSocket();

  const onDelete = async () => {
    if (socket == null) return;

    onClose();

    socket.emit("deleteBoard", getAuthCookie(), board.id);
  };

  const onCancel = async () => {
    if (socket == null) return;

    onClose();
  };

  return (
    <Dialog
      disablePortal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>Delete board {`'${board.name}'`}?</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel} autoFocus>
          No
        </Button>
        <Button onClick={onDelete} color="warning">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
