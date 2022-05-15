import {Divider, ListItem, ListItemIcon, ListItemText, Button, Icon} from "@material-ui/core";
import List from "@mui/material/List";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const drawerWidth = 240;

const LeftMenu = ({ buttons, selected, notifyButtonClicked }) => {
    
    return (
        <div
            style={{
                width: drawerWidth,
                height: '100vh',
                flexShrink: 0,
                borderRight: '1px solid lightgrey'
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {buttons.map((b, index) => (
                    <div key={`button-${index}`} style={{ background: selected === index ? '#ddd' : '#fff' }}>
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
        </div>
    )
};

export default LeftMenu;