import { useState, useEffect } from "react";
import Header from './components/Header';
import Config from "./components/Config";
import ViewPage from "./components/View3D/ViewPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {createTheme} from "@mui/material";
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
            main: '#42A5F5',
            light: '#42A5F5',
            dark: '#42A5F5'
        },
        secondary: {
            main: '#F70057',
            light: '#F70057',
            dark: '#F70057'
        }
    },
});


function App() {
    const [historyIndex, setHistoryIndex] = useState(getJSONFromStorage('historyIndex', 0));
    const [historyActions, setHistoryActions] = useState(getJSONFromStorage('historyActions', []));
    const [originalSolution, setOriginalSolution] = useState(getJSONFromStorage('originalSolution', {}));
    const [solution, setSolution] = useState(getJSONFromStorage('solution', {}));
    const [packages, setPackages] = useState(getJSONFromStorage('packages', []));
    const [container, setContainer] = useState(getJSONFromStorage('container', {
        width: null,
        height: null,
        depth: null,
        maxWeight: null,
    }));    
    const [units, setUnits] = useState(getJSONFromStorage('units', {
        length: 'm',
        weight: 'kg',
    }));

    useEffect(() => { saveJSONinStorage('units', units) }, [units]);
    useEffect(() => { saveJSONinStorage('solution', solution) }, [solution]);
    useEffect(() => { saveJSONinStorage('packages', packages) }, [packages]);
    useEffect(() => { saveJSONinStorage('container', container) }, [container]);
    useEffect(() => { saveJSONinStorage('historyIndex', historyIndex) }, [historyIndex]);
    useEffect(() => { saveJSONinStorage('historyActions', historyActions) }, [historyActions]);
    useEffect(() => { saveJSONinStorage('originalSolution', originalSolution) }, [originalSolution]);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route 
                        exact 
                        path="/"
                        element={
                            <Header 
                                units={units} 
                                setUnits={setUnits} 
                                setSolution={setSolution} 
                                setOriginalSolution={setOriginalSolution} 
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
                                setSolution={setSolution}
                                setOriginalSolution={setOriginalSolution}
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
                                originalSolution={originalSolution}
                                historyIndex={historyIndex}
                                setHistoryIndex={setHistoryIndex}
                                historyActions={historyActions}
                                setHistoryActions={setHistoryActions}
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
