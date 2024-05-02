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
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const tabStyles = (currentTab, tabValue, darkMode) => ({
    color: currentTab === tabValue ? "#fff" : (darkMode ? "#fff" : "#000"),
    backgroundColor: currentTab === tabValue ? "#d97706" : "transparent",
    fontWeight: currentTab === tabValue ? "bold" : "normal",
    borderRadius: "4px",
    minWidth: "120px",
    marginRight: "10px",
    transition: "background-color 0.4s ease, color 0.4s ease",
    textShadow: currentTab === tabValue ? (darkMode ? "0 0 2px rgba(255, 255, 255, 0.5)" : "0 0 2px rgba(0, 0, 0, 0.5)") : "none",
    "&:hover": {
      backgroundColor: currentTab === tabValue ? "#d97706" : "transparent",
      color: currentTab === tabValue ? "#fff" : (darkMode ? "#fff" : "#000"),
      textShadow: currentTab === tabValue ? (darkMode ? "0 0 2px rgba(255, 255, 255, 0.5)" : "0 0 2px rgba(0, 0, 0, 0.5)") : "none",
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
    fontWeight: "700",
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ display: { xs: "none", md: "block" },fontWeight: "bold" }}>
              Task Tracker
            </Typography>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '@media (max-width: 600px)': {
                  display: 'none',
                },
              }}
            >
              <Tab label="Tasks" sx={tabStyles(tabIndex, 0)} />
              <Tab
                label={
                  <Badge badgeContent={completedTasks.length} color="error">
                    Completed Tasks
                  </Badge>
                }
                sx={tabStyles(tabIndex, 1)}
              />
              <Tab label="Settings" sx={tabStyles(tabIndex, 2)} />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <List>
            <ListItem
              button
              onClick={() => {
                setTabIndex(0);
                setSidebarOpen(false);
              }}
            >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setTabIndex(1);
                setSidebarOpen(false);
              }}
            >
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Completed Tasks" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setTabIndex(2);
                setSidebarOpen(false);
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>
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
