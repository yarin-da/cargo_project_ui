import { useState } from "react";
import Header from './components/Header';
import Config from "./components/Config";
import ViewPage from "./components/View3D/ViewPage";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

// TODO: delete all console.logs, debuggers and unused variables/imports

function App() {
    const [solution, setSolution] = useState({});
    const [showPackageView, setShowPackageView] = useState(false);
    const [container, setContainer] = useState({
        width: null,
        height: null,
        depth: null,
        maxWeight: null,
        cost: null,
    });

    const [packages, setPackages] = useState([]);
    
    const [units, setUnits] = useState({
        length: 'm',
        weight: 'kg',
    });

    // TODO: persist data
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
                            units={units}
                            setUnits={setUnits}
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
                            units={units}
                            setUnits={setUnits}
                        />
                    }
                >
                </Route>
            </Routes>
        </Router>
    );
};

const Home = ({ units, setUnits, setSolution }) => {
    return (
        <div className="App">
            <Header units={units} setUnits={setUnits} setSolution={setSolution} />
        </div>
    );
}

export default App;
