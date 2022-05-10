import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import {AppBar, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import List from "@mui/material/List";
import logo from '../images/logo.png'

const drawerWidth = 240;

const logoStyle ={
    height: 30,
    width: 200,
    marginLeft: "20%"
}

const LeftMenu = ({ buttons, notifyButtonClicked }) => {
    
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <img src={logo} alt={logo} style={logoStyle}/>
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