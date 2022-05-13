import {useState} from "react";
import Header from './components/Header';
import UnitsOfMeasurement from "./components/UnitsOfMeasurement";
import AddContainer from "./components/AddContainer";
import PackagesList from "./components/PackagesList";
import Package from "./components/Package";
import Ticket from "./components/Ticket";
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SummaryModal from "./components/SummaryModal";
import Button from '@mui/material/Button';
import { getSolution } from "./components/ServerHandler";
import PackageBoxIcon from "./images/package-box-icon.png";
import View3D from "./components/View3D/View3D";
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

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

  return (
    <Router>
      <Routes>
        <Route 
          exact 
          path="/"
          element={
            <Home 
              container={container} 
              setContainer={setContainer} 
              packages={packages} 
              setPackages={setPackages} 
              units={units} 
              setUnits={setUnits} 
              currentPackage={currentPackage} 
              setCurrentPackage={setCurrentPackage} 
              showPackageView={showPackageView} 
              setShowPackageView={setShowPackageView}
            />
          }
        >
        </Route>
        <Route 
          path="/view" 
          element={<View3D />}
        >
        </Route>
      </Routes>
    </Router>
  );
};

const Home = ({ 
  container, setContainer, 
  packages, setPackages, 
  units, setUnits, 
  currentPackage, setCurrentPackage, 
  showPackageView, setShowPackageView 
}) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const uploadDataToServer = async () => {
    const data = {
      container,
      packages,
    };
    // TODO: check if data is valid?
    try {
      setLoading(true);
      const response = await getSolution(data);
      console.log('response', response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    navigate("/view");
  };

  return (
    <div className="App">
      <Header setContainer={setContainer} setPackages={setPackages} />
      <div className="below-header">
        <div className="side-by-side">
          <Ticket Icon={SquareFootIcon} title="Units of Measurement">
            <UnitsOfMeasurement units={units} setUnits={setUnits} />
          </Ticket>
          <Ticket Icon={LocalShippingIcon} title="Container Details">
            <AddContainer container={container} setContainer={setContainer} />
          </Ticket>
          <Ticket Icon={PackageBoxIcon} title="Package Details" isCustom={true}>
            <PackagesList 
              packages={packages} 
              setPackages={setPackages} 
              currentPackage={currentPackage} 
              setCurrentPackage={setCurrentPackage} 
              setShowPackageView={setShowPackageView}
            />
          </Ticket>
        </div>
        <SummaryModal 
          units={units} 
          packages={packages} 
          setCurrentPackage={setCurrentPackage} 
          showPackageView={showPackageView}
          setShowPackageView={setShowPackageView}
        />
        {loading ? 
          <CircularProgress size={25} /> 
          : 
          <Button
            onClick={uploadDataToServer}
            component="span"
            style={buttonStyle}
            size="large"
            variant="outlined"
          >
            Confirm
          </Button>
        }
      </div>
    </div>
  );
}

export default App;
