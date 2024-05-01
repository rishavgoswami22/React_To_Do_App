import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Badge } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';

const CompletedTasks = ({ completedTasks, onDeleteTask }) => {
  const handleDeleteClick = (id) => {
    onDeleteTask(id);
  };

  return (
    <List>
      <ListItem>
        <ListItemText />
        <Badge badgeContent={completedTasks.length} color="secondary" />
      </ListItem>
      {completedTasks.map((task) => (
        <ListItem key={task.id}>
          <Checkbox
            icon={<CheckCircleIcon />}
            checkedIcon={<CheckCircleIcon style={{ color: green[500] }} />}
            checked={true}
            disabled
          />
          <ListItemText primary={task.name} secondary={task.description} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleDeleteClick(task.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default CompletedTasks;
