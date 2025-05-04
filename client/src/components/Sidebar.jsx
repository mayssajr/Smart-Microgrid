import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Home, Storage, BarChart, Settings, History } from "@mui/icons-material";

const Sidebar = ({ onSectionChange }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => onSectionChange("dashboard")}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => onSectionChange("energyStorage")}>
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText primary="Energy Storage" />
        </ListItem>

        <ListItem button onClick={() => onSectionChange("energyAnalytics")}>
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Energy Analytics" />
        </ListItem>

        <ListItem button onClick={() => onSectionChange("settings")}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button onClick={() => onSectionChange("accessHistory")}>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Access History" />
        </ListItem>
        <ListItem button onClick={() => onSectionChange("admin")}>
        <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Admin Panel" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;