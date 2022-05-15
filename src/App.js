import {useState} from "react";
import Header from './components/Header';
import UnitsOfMeasurement from "./components/UnitsOfMeasurement";
import AddContainer from "./components/AddContainer";
import PackagesList from "./components/PackagesList";
import Package from "./components/Package";
import Ticket from "./components/Ticket";
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {ToggleButton, Alert} from "@mui/material";
import Button from '@mui/material/Button';
import Config from "./components/Config";
import CheckIcon from '@mui/icons-material/Check';
import { getSolution } from "./components/ServerHandler";
import PackageBoxIcon from "./images/package-box-icon.png";
import View3D from "./components/View3D/View3D";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { Snackbar } from "@material-ui/core";

const buttonStyle = {
  textTransform: 'none',
  color: "black",
  borderColor: "black",
  marginTop: 25,
  marginBottom: 25,
}

function App() {
  const [solution, setSolution] = useState({});
  const [colorMap, setColorMap] = useState({
    jewelry: 0xFF0000,
    clothing: 0x44AA44,
    electronics: 0x775577,
    glass: 0x005500
  });
  const [showPackageView, setShowPackageView] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(1);
  const [container, setContainer] = useState({
    width: 0,
    height: 0,
    depth: 0,
    maxWeight: 0,
    cost: 0,
  });

  const [packages, setPackages] = useState([ new Package() ]);
  
  const [units, setUnits] = useState({
    length: 'm',
    weight: 'kg',
  });

  // https://joaoforja.com/blog/how-to-persist-state-after-a-page-refresh-in-react-using-local-storage
  // useEffect(() => {
  //   localStorage.setItem('__p');
  // }, [solution, colorMap, showPackageView, currentPackage, container, packages, units]);

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
              showPackageView={showPackageView} 
              setShowPackageView={setShowPackageView}
              setSolution={setSolution}
            />
          }
        >
        </Route>
        <Route 
          path="/view" 
          element={
            <View3D 
              solution={solution}
              colorMap={colorMap}
            />
          }
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
  setSolution
}) => {
  const [isPackages, setIsPackages] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(false);

  const notifyLoading = async () => {
    await setLoading(true);
    await setSnackbarSeverity("info");
    await setSnackbarTitle("Organizing your packages...");
    await setSnackbarOpen(true);
  };

  const notifyError = async () => {
    await setSnackbarSeverity("error");
    await setSnackbarTitle("Failed to organize your packages.");
    await setSnackbarOpen(true);
  };

  const uploadDataToServer = async () => {
    const data = {
      container,
      packages,
    };
    // TODO: check if data is valid?
    try {
      await notifyLoading();
      const solution = await getSolution(data);

      // TODO: figure out why the algorithm flips dimensions (inner rotation??)
      // TODO: handle rotations
      // solution['packages'].forEach(pkg => {
      //   const temp = pkg['width'];
      //   pkg['width'] = pkg['height'];
      //   pkg['height'] = temp;
      // });
      // const temp = solution['container']['width'];
      // solution['container']['width'] = solution['container']['depth'];
      // solution['container']['depth'] = temp;
      // console.log(solution);

      setSolution(solution);
      navigate("/view");
    } catch (e) {
      console.log(e);
      await notifyError();
    } finally {
      setLoading(false);
    }
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
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarTitle}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
