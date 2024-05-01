import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const TaskList = ({ tasks, onDeleteTask, onCompleteTask, onSaveEdit, onCancelEdit }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false); 

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
  };

  const handleCancelEdit = () => {
    setEditingTask(null); 
    onCancelEdit(); 
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          {editingTask === task ? (
            <>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                fullWidth
              />
              <TextField
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                fullWidth
              />
              <Button onClick={() => handleSaveEdit(task.id, editedName, editedDescription)}>Save</Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </>
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
                <IconButton onClick={() => onDeleteTask(task.id)} edge="end" aria-label="delete">
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
          Are you sure you want to save changes?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmSave}>Yes</Button>
          <Button onClick={() => setOpenConfirmation(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default TaskList;
