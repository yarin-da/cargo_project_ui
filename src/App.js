import React, {useState} from "react";
import Header from './components/Header';
import UnitsOfMeasurement from "./components/UnitsOfMeasurement";
import AddContainer from "./components/AddContainer";
import ConfirmButton from "./components/ConfirmButton";
import PackagesList from "./components/PackagesList";
import "./App.css";
import Package from "./components/Package";

function App() {
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
    <div className="App">
      <Header setContainer={setContainer} setPackages={setPackages} />
      <UnitsOfMeasurement units={units} setUnits={setUnits} />
      <AddContainer container={container} setContainer={setContainer} />
      <PackagesList packages={packages} setPackages={setPackages} />
      <ConfirmButton units={units} container={container} packages={packages} />
    </div>
  );
}

export default App;
