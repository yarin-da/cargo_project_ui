import './App.css';
import Header from './components/Header';
import UnitsOfMeasurement from "./components/UnitsOfMeasurement";
import AddCargo from "./components/AddCargo";
import AddPackage from "./components/AddPackage";

function App() {
  return (
    <div className="App">
      <Header/>
        <UnitsOfMeasurement/>
        <AddCargo/>
      <AddPackage/>
    </div>

  );
}

export default App;
