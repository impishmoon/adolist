import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { FC } from "react";
import { blue } from "@mui/material/colors";
import BoardType from "@/types/client/board/board";

type Props = {
  open: boolean;
  onClose: () => void;
  board: BoardType;
};

const emails = ["username@gmail.com", "user02@gmail.com"];

const ShareModal: FC<Props> = ({ open, onClose, board }) => {
  //TODO: Implement here debounced function to send socket to backend to get list of searchable users for board
  //Provide auth, boardid, and searchQuery and server will return filtered list of users (not the same user that's sending the socket and not any user that is already shared)

  return (
    <Dialog
      disablePortal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>Share with users</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography align="center">New users</Typography>
            <TextField label="Search users" />
            <List sx={{ pt: 0 }}>
              {emails.map((email) => (
                <ListItem key={email} disableGutters>
                  <ListItemButton onClick={() => {}} key={email}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center">Existing users</Typography>
            <List sx={{ pt: 0 }}>
              {board.shares.map((user) => (
                <ListItem key={user.id} disableGutters>
                  <ListItemButton onClick={() => {}}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
