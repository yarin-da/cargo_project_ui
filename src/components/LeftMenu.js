import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {AppBar, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import AddIcon from "@material-ui/icons/Add";
import {LocalShipping, Settings} from "@material-ui/icons";
import {Upload} from "@mui/icons-material";

const drawerWidth = 240;

const LeftMenu = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <Divider/>
                <List>
                    {['Settings', 'Upload file (optional)', 'Container', 'Packages'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index === 0 ? <Settings/> : index === 1 ? <Upload/> : index === 2 ? <LocalShipping/> :
                                    <Settings/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>

            </Drawer>
        </Box>
    )
};

export default LeftMenu;