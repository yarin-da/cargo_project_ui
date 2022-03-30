
const IconCircle = ({ children }) => {
    const style = {
        border: '5px solid white',
        borderRadius: '50%',
        marginBottom: '-30px',
        backgroundColor: '#DAA520',
        padding: '10px',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .2)',
    };
    return (
        <div style={style}>
            {children}
        </div>
    );
};

const Ticket = ({ Icon, children }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        margin: '10px',
        padding: '10px',
    };
    const style = {
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .2)',
        borderRadius: '10px',
        padding: '30px',
        background: 'white',
        flexGrow: 1,
    };
    return (
        <div style={containerStyle}>
            <div style={style}>
                {children}
            </div>
            <IconCircle>
                <Icon htmlColor="white" fontSize="large" />
            </IconCircle>
        </div>
    );
};

export default Ticket;