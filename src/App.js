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
import ToggleButton from "@mui/material/ToggleButton";
import Button from '@mui/material/Button';
import Config from "./components/Config";
import CheckIcon from '@mui/icons-material/Check';
import { getSolution } from "./components/ServerHandler";
import PackageBoxIcon from "./images/package-box-icon.png";
import View3D from "./components/View3D";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
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
            />
          }
        >
        </Route>
        <Route 
          path="/config"
          element={
            <Config 
              units={units}
              setUnits={setUnits}
              packages={packages}
              setPackages={setPackages}
              currentPackage={currentPackage}
              setCurrentPackage={setCurrentPackage}
              container={container} 
              setContainer={setContainer}
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
}) => {
  const [isPackages, setIsPackages] = useState(false);
  const { t } = useTranslation();
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
          <div>
            <ToggleButton
                value="check"
                selected={isPackages}
                onChange={() => {
                  setIsPackages(!isPackages);
                }}
            >
              <CheckIcon/>
            </ToggleButton>
          </div>

          {isPackages ?
              <Ticket Icon={PackageBoxIcon} title="Package Details" isCustom={true}>
                <PackagesList
                    units={units}
                    packages={packages}
                    setPackages={setPackages}
                    currentPackage={currentPackage}
                    setCurrentPackage={setCurrentPackage}
                />
              </Ticket>
              :
              <Ticket Icon={LocalShippingIcon} title="Container Details">
                <AddContainer container={container} setContainer={setContainer} />
              </Ticket>
          }
        </div>
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
            {t('confirm')}
          </Button>
        }
      </div>
    </div>
  );
}

export default App;
