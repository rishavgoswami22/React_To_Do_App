import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import CompletedTasks from "./CompletedTasks";
import Settings from "./Settings";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
  Paper,
  Box,
  Badge,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";


const TaskTrackerApp = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    setCompletedTasks([...completedTasks, completedTask]);
    handleDeleteTask(id);
  };

  const handleDeleteCompletedTask = (id) => {
    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== id
    );
    setCompletedTasks(updatedCompletedTasks);
  };

  const onSaveEdit = (editedTasks) => {
    setTasks(editedTasks);
  };

  const onCancelEdit = () => {
    console.log("Edit cancelled.");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const tabStyles = (currentTab, tabValue) => ({
    color: currentTab === tabValue ? "#fff" : "black",
    backgroundColor: currentTab === tabValue ? "#d97706" : "transparent",
    fontWeight: currentTab === tabValue ? "bold" : "normal",
    borderRadius: "4px",
    minWidth: "120px",
    marginRight: "10px",
    transition: "background-color 0.4s ease, color 0.4s ease",
    "&:hover": {
      backgroundColor: currentTab === tabValue ? "#d97706" : "transparent",
      color: currentTab === tabValue ? "#fff" : "white",
    },
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFA500",
      },
      secondary: {
        main: "#2E8B57",
      },
      background: {
        default: darkMode ? "#212121" : "#f0f0f0",
      },
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: darkMode ? "#212121" : "linear-gradient(to right, #3f87a6, #ebf8e1)",
          transition: "background-color 0.4s ease",
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Task Tracker</Typography>
          </Toolbar>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab
              icon={<Box sx={{ display: "flex", alignItems: "center" }}><FormatListBulletedIcon sx={{ fontSize: 20 }} />Tasks</Box>}
              sx={tabStyles(tabIndex, 0)}
            />
            <Tab
              icon={
                <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />Completed Tasks
                  {completedTasks.length > 0 && (
                    <Badge badgeContent={completedTasks.length} color="success" sx={{ marginLeft: 2 }} />
                  )}
                </Box>
              }
              sx={tabStyles(tabIndex, 1)}
            />
            <Tab
              icon={<Box sx={{ display: "flex", alignItems: "center" }}><SettingsIcon sx={{ fontSize: 20 }} />Settings</Box>}
              sx={tabStyles(tabIndex, 2)}
            />
          </Tabs>
        </AppBar>
        <Container sx={{ flexGrow: 1, mt: 3 }}>
          <Paper sx={{ p: 2, flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {tabIndex === 0 && (
                  <>
                    <Typography variant="h5" sx={{ mb: 3, color: "#1976d2" }}>
                      Task List
                    </Typography>
                    <TaskList
                      tasks={tasks}
                      onDeleteTask={handleDeleteTask}
                      onCompleteTask={handleCompleteTask}
                      onSaveEdit={onSaveEdit}
                      onCancelEdit={onCancelEdit}
                    />
                    <TaskForm onAddTask={handleAddTask} />
                  </>
                )}
                {tabIndex === 1 && (
                  <>
                    <Typography variant="h5" sx={{ mb: 3, color: "#4caf50" }}>
                      Completed Tasks
                    </Typography>
                    <CompletedTasks
                      completedTasks={completedTasks}
                      onDeleteTask={handleDeleteCompletedTask}
                    />
                  </>
                )}
                {tabIndex === 2 && (
                  <>
                    <Typography variant="h5" sx={{ mb: 3, color: "#ff5722" }}>
                      Settings
                    </Typography>
                    <Settings toggleDarkMode={toggleDarkMode} />
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TaskTrackerApp;
