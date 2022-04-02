import "../styles/Ticket.css";

const IconCircle = ({ children }) => {
    return (
        <div className="circle-icon">
            {children}
        </div>
    );
};

const Ticket = ({ Icon, children }) => {
    return (
        <div className="ticket-container">
            <div className="ticket">
                {children}
            </div>
            <IconCircle>
                <Icon htmlColor="white" fontSize="large" />
            </IconCircle>
        </div>
    );
};

export default Ticket;