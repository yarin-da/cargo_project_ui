import { useState } from "react";
import Header from './components/Header';
import Package from "./components/Package";
import Config from "./components/Config";
import ViewPage from "./components/View3D/ViewPage";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [solution, setSolution] = useState({});
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
              packages={packages} 
              setSolution={setSolution}
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
            <ViewPage 
              solution={solution}
            />
          }
        >
        </Route>
      </Routes>
    </Router>
  );
};

const Home = () => {

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
