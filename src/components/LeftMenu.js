import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import List from "@mui/material/List";

const LeftMenu = ({ buttons, selected, notifyButtonClicked }) => {
    return (
        <div
            style={{
                width: 240,
                height: '100%',
                flexShrink: 0,
                borderRight: '1px solid lightgrey'
            }}
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