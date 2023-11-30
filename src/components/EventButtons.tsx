import React, { useState } from "react";
import { Box, Stack, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";

export default function EventButtons() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box mt={2}>
        <Button
          onClick={toggleDrawer}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#2196f3",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Menu
        </Button>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component="a" href="/upcoming">
            <ListItemText primary="Upcoming" />
          </ListItem>
          <ListItem button component="a" href="/past">
            <ListItemText primary="Past" />
          </ListItem>
          <ListItem button component="a" href="/calendar">
            <ListItemText primary="Calendar" />
          </ListItem>
          {/* Add more list items for other pages as needed */}
        </List>
      </Drawer>
    </>
  );
}
