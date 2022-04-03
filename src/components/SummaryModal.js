import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CardMedia from '@mui/material/CardMedia';
import image from "../images/package_icon.png";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  background: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 5,
  width: 'min(80%, 850px)',
  background: '#ddd',
};

const MyList = ({ units, container, packages, setCurrentPackage, handleClose }) => {
    const onClick = (i) => {
        setCurrentPackage(i + 1); 
        handleClose();
    };
    return (
      <List
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          maxHeight: '80vh',
          '& ul': { padding: 0 },
        }}
      >
        {packages.map((p, i) => (
          <div key={`section-${i}`}>
              <ListItem >
                <PackageRow units={units} values={p} onClick={() => onClick(i)} />
              </ListItem>
          </div>
        ))}
      </List>
    );
  }

const PackageRow = ({ units, values: p, onClick }) => {
    const rowStyle = {
        width: '100%',
        background: '#fff',
        padding: 15,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    };
    const detailsStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        rowGap: 10,
        columnGap: 20,
    };
    const details = {
        amount: `${p['amount']}`,
        size: <div>{p['width']}&times;{p['height']}&times;{p['depth']}{units['length']}</div>,
        weight: `${p['weight']}${units['weight']}`,
        profit: `${p['profit']}`,
        priority: `${p['priority']}`,
        rotate: p['canRotate'] ? <CheckRoundedIcon htmlColor="green" /> : <ClearRoundedIcon htmlColor="red" />,
        stackAbove: p['canStackAbove'] ? <CheckRoundedIcon htmlColor="green" /> : <ClearRoundedIcon htmlColor="red" />,
    };
    return (
        <span style={rowStyle}>
            <IconButton 
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                }}
            >
                <EditIcon />
            </IconButton>
            <CardMedia 
                component="img"
                image={image}
                sx={{
                    width: 50,
                    height: 50,
                }}
            />
            <hr width="1" size="100" color="lightgrey" />
            <div>
                <Typography sx={{marginBottom: 2}} variant="h5" component="h2">
                    {`${p['type']}`}
                </Typography>
                <div style={detailsStyle}>
                    {Object.keys(details).map((key, i) => 
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} key={i}>
                            <Typography noWrap sx={{fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} variant="subtitle2" component="h3">
                                <span>{`${key}`}</span>
                            </Typography>
                            <Typography noWrap sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} variant="subtitle2" component="h3">
                                <span>{details[key]}</span>
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </span>
        
    );
};

const SummaryModal = ({ units, packages, setCurrentPackage, showPackageView, setShowPackageView }) => {
  return (
    <div>
      <Modal
        keepMounted
        open={showPackageView}
        onClose={() => setShowPackageView(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
          <Box style={style}>
              <IconButton 
                onClick={() => setShowPackageView(false)}
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
              >
                <ClearRoundedIcon fontSize="large" />
              </IconButton>
              <Typography 
                noWrap 
                variant="h4"
                component="h3" 
                sx={{
                    fontWeight: 'bold', 
                    width: '100%', 
                    borderBottom: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                }}
              >
                  Review Your Packages
              </Typography>
              <MyList 
                packages={packages} 
                units={units} 
                setCurrentPackage={setCurrentPackage}
                handleClose={() => setShowPackageView(false)}
            />
          </Box>
      </Modal>
    </div>
  );
}

export default SummaryModal;