import './App.css';
import Header from './components/Header';
import UnitsOfMeasurement from "./components/UnitsOfMeasurement";
import AddCargo from "./components/AddCargo";
import AddPackage from "./components/AddPackage";
import ConfirmButton from "./components/ConfirmButton";
import PackagesList from "./components/PackagesList";

function App() {
  return (
    <div className="App">
      <Header/>
        <UnitsOfMeasurement/>
        <AddCargo/>

      {/*<AddPackage/>*/}
        <PackagesList/>
        <ConfirmButton/>
    </div>

  );
}

export default App;
