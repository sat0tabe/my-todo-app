import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';

type AddTodoDialogProps = {
  open: boolean;
  onClose: () => void;
  text: string;
  setText: (text: string) => void;
  deadline: Date | null;
  setDeadline: (date: Date | null) => void;
  handleSave: () => void;
};

const AddTodoDialog = ({ open, onClose, text, setText, deadline, setDeadline, handleSave }: AddTodoDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>新しいタスクを追加</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="タスク"
        fullWidth
        variant="outlined"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button onClick={handleSave}>保存</Button>
    </DialogActions>
  </Dialog>
);

export default AddTodoDialog;