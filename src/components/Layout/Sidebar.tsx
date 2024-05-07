import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  UsersIcon,
  HomeIcon,
  DocumentIcon, TagIcon
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import BotsList from "../BotsList/BotsList";
import BotsWorkersList from "../BotsWorkersList/BotsWorkersList";
import BotsLogList from "../BotsLogList/BotsLogList";
import BotsWorkerLogList from "../BotsWorkerLog/BotsWorkerLogList";

const drawerWidth = 240;

const navigation = [
  { id: 1, name: "List of Bots", href: "/", icon: HomeIcon, current: true },
  { id: 2, name: "List of Workers For A Bot", href: "/ListOfWorkersForABot", icon: UsersIcon, current: true },
  { id: 3, name: "List of Logs For A Bot", href: "/ListOfLogsForABot", icon: DocumentIcon, current: true },
  { id: 4, name: "List of Logs For A Worker For A Bot", href: "/ListOfLogsForAWorkerForABot", icon: TagIcon, current: true }
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "grey" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "grey",
            borderColor: "white",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigation?.map((text: any, index) => (
            <Link to={text.href} key={index}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <text.icon
                      className="h-6 w-6 shrink-0 text-blue-400"
                      aria-hidden="true"
                    />
                  </ListItemIcon>
                  <ListItemText primary={text?.name} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ background: "grey" }} />
            </Link>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {location.pathname === "/" && <BotsList />}
        {location.pathname === "/ListOfWorkersForABot" && <BotsWorkersList />}
        {location.pathname === "/ListOfLogsForABot" && <BotsLogList />}
        {location.pathname === "/ListOfLogsForAWorkerForABot" && <BotsWorkerLogList/>}
      </Main>
    </Box>
  );
}
