import React, {useState} from "react";
import Header from './components/Header';
import UnitsOfMeasurement from "./components/UnitsOfMeasurement";
import AddContainer from "./components/AddContainer";
import PackagesList from "./components/PackagesList";
import "./App.css";
import Package from "./components/Package";

import Ticket from "./components/Ticket";
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SummaryModal from "./components/SummaryModal";
import Button from '@mui/material/Button';

// TODO: environment variable?
const SERVER_URL = 'http://localhost:10789';

const buttonStyle = {
  textTransform: 'none',
  color: "black",
  borderColor: "black",
  marginTop: 25,
  marginBottom: 25,
}

function App() {
  const [showPackageView, setShowPackageView] = useState(false);

  const [currentPackage, setCurrentPackage] = useState(1);
  
  const [container, setContainer] = useState({
    width: 0,
    height: 0,
    depth: 0,
    maxWeight: 0,
    cost: 0,
  });

  const [packages, setPackages] = useState([
    new Package()
  ]);
  
  const [units, setUnits] = useState({
    length: 'm',
    weight: 'kg',
  });

  const sendData = async () => {
    const data = {
      container,
      packages,
    };
    const request = `${SERVER_URL}/solve`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(request, options);
    const solution = await response.json();
    console.log('solution', solution);
  };

  return (
    <div className="App">
      <Header setContainer={setContainer} setPackages={setPackages} />
      <div className="side-by-side">
        <Ticket Icon={SquareFootIcon} title="Units of Measurement">
          <UnitsOfMeasurement units={units} setUnits={setUnits} />
        </Ticket>
        <Ticket Icon={LocalShippingIcon} title="Container Details">
          <AddContainer container={container} setContainer={setContainer} />
        </Ticket>
        <PackagesList 
          packages={packages} 
          setPackages={setPackages} 
          currentPackage={currentPackage} 
          setCurrentPackage={setCurrentPackage} 
          setShowPackageView={setShowPackageView}
        />
      </div>
      <SummaryModal 
        units={units} 
        container={container} 
        packages={packages} 
        currentPackage={currentPackage} 
        setCurrentPackage={setCurrentPackage} 
        showPackageView={showPackageView}
        setShowPackageView={setShowPackageView}
      />
      <Button
        className="confirm-button"
        onClick={sendData}
        component="span"
        multiple type="file"
        style={buttonStyle}
        size="large"
        variant="outlined">
        Confirm
      </Button>
    </div>
  );
}

export default App;
