import {AppBar, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar, Button, Icon} from "@material-ui/core";
import List from "@mui/material/List";
import logo from '../images/logo.png';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const drawerWidth = 240;

const logoStyle = {
    height: 30,
    width: 200,
}

const LeftMenu = ({ buttons, selected, notifyButtonClicked }) => {
    
    return (
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
            <div style={{ display: 'flex', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <img src={logo} alt={logo} style={logoStyle}/>
            </div>
            <Divider />
            <List>
                {buttons.map((b, index) => (
                    <div style={{ background: selected === index ? '#ddd' : '#fff' }}>
                    <ListItem button key={b.title} onClick={() => notifyButtonClicked(index)}>
                        <ListItemIcon>
                            {b.icon}
                        </ListItemIcon>
                        <ListItemText primary={b.title}/>
                    </ListItem>
                    <Divider/>
                    </div>
                ))}
            </List>
            <Button onClick={() => notifyButtonClicked((selected + 1) % buttons.length)}>
                <span>Next</span>
                <Icon>
                    <ArrowForwardRoundedIcon />
                </Icon>
            </Button>
            <Divider/>
        </Drawer>
    )
};

export default LeftMenu;