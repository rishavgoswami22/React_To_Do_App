import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskList = ({
  tasks,
  onDeleteTask,
  onCompleteTask,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleStartEdit = (task) => {
    setEditingTask(task);
    setEditedName(task.name);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = (id, editedName, editedDescription) => {
    setOpenConfirmation(true);
  };

  const handleConfirmSave = () => {
    setOpenConfirmation(false);
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id
        ? { ...task, name: editedName, description: editedDescription }
        : task
    );
    onSaveEdit(updatedTasks);
    setEditingTask(null);
    setSnackbarMessage("Changes saved successfully.");
    setOpenSnackbar(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    onCancelEdit();
  };

  const handleDeleteConfirmation = (taskId) => {
    setDeleteTaskId(taskId);
    setOpenConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    onDeleteTask(deleteTaskId);
    setOpenConfirmation(false);
    setSnackbarMessage("Task deleted successfully.");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          {editingTask === task ? (
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                fullWidth
                style={{ marginRight: "10px" }}
              />
              <TextField
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                fullWidth
                style={{ marginRight: "10px" }}
              />
              <Button
                onClick={() => handleSaveEdit(task.id, editedName, editedDescription)}
                sx={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Button onClick={handleCancelEdit} sx={{ color: "#1976d2" }}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <Checkbox
                checked={task.completed}
                onChange={(e) => onCompleteTask(task.id, e.target.checked)}
              />
              <ListItemText primary={task.name} secondary={task.description} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleStartEdit(task)} edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteConfirmation(task.id)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {deleteTaskId ? "Are you sure you want to delete this task?" : "Are you sure you want to save changes?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={deleteTaskId ? handleDeleteConfirmed : handleConfirmSave} color="primary">
            Yes
          </Button>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </List>
  );
};

export default TaskList;
