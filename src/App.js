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
import { getSolution } from "./components/ServerHandler";

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

  const uploadDataToServer = async () => {
    const data = {
      container,
      packages,
    };
    // TODO: if data is valid?
    const response = await getSolution(data);
    console.log('response', response);
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
        onClick={uploadDataToServer}
        component="span"
        style={buttonStyle}
        size="large"
        variant="outlined">
        Confirm
      </Button>
    </div>
  );
}

export default App;
