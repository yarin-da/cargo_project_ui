import {CardMedia} from '@mui/material';
import "../styles/Ticket.css";

const IconCircle = ({ children }) => {
    return (
        <div className="circle-icon">
            {children}
        </div>
    );
};

const Ticket = ({ Icon, children, title, isCustom=false }) => {
    return (
        <div className="ticket-container">
            <div className="ticket">
                {children}
            </div>
            <IconCircle>
                {isCustom ?
                    <CardMedia 
                        component="img"
                        image={Icon}
                        sx={{
                            width: 40,
                            height: 40,
                        }}
                    />
                    :
                    <Icon htmlColor="white" fontSize="large" />}
            </IconCircle>
            <div style={{fontSize: 20, fontWeight: 'bold', color: '#553', marginBottom: 20}}>
                {title}
            </div>
        </div>
    );
};

export default Ticket;