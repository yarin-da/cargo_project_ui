import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {AppBar, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

const drawerWidth = 240;

const LeftMenu = ({ buttons, notifyButtonClicked }) => {
    
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
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
                    {buttons.map((b, index) => (
                        <ListItem button key={b.title} onClick={() => notifyButtonClicked(index)}>
                            <ListItemIcon>
                                {b.icon}
                            </ListItemIcon>
                            <ListItemText primary={b.title}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>

            </Drawer>
        </Box>
    )
};

export default LeftMenu;