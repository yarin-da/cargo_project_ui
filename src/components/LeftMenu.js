import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import List from "@mui/material/List";

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
        </div>
    )
};

export default LeftMenu;