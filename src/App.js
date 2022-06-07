import { useState, useEffect } from "react";
import Header from './components/Header';
import Config from "./components/Config";
import ViewPage from "./components/View3D/ViewPage";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@emotion/react";

// TODO: delete all console.logs, debuggers and unused variables/imports

const getJSONFromStorage = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
}

const saveJSONinStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#42A5F5',
            light: '#42A5F5',
            dark: '#42A5F5'
        },
    },
});


function App() {
    const [solution, setSolution] = useState(getJSONFromStorage('solution', {}));
    const [packages, setPackages] = useState(getJSONFromStorage('packages', []));
    const [container, setContainer] = useState(getJSONFromStorage('container', {
        width: null,
        height: null,
        depth: null,
        maxWeight: null,
        cost: null,
    }));    
    const [units, setUnits] = useState(getJSONFromStorage('units', {
        length: 'm',
        weight: 'kg',
    }));

    useEffect(() => { saveJSONinStorage('solution', solution); console.log('saved'); }, [solution]);
    useEffect(() => { saveJSONinStorage('packages', packages) }, [packages]);
    useEffect(() => { saveJSONinStorage('container', container) }, [container]);
    useEffect(() => { saveJSONinStorage('units', units) }, [units]);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Header units={units} setUnits={setUnits} setSolution={setSolution} />
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
                                setSolution={setSolution}
                                units={units}
                                setUnits={setUnits}
                            />
                        }
                    >
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
