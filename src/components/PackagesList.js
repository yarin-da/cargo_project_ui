import AddPackage from "./AddPackage";
import Package from "./Package";
import {Fab} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import {Tooltip} from "@mui/material";
import DraftsIcon from '@mui/icons-material/Drafts';
import Ticket from "./Ticket";

const PackagesList = ({ packages, setPackages }) => {
    const addPackage = () =>
        setPackages(prev => [...prev, new Package()]);

    const deletePackage = (values) => {
        const newPackages = packages.filter(p => p['id'] !== values['id']);
        setPackages(newPackages);
    };

    const onChange = (values) => {
        const newPackages = packages.map(p => p['id'] === values['id'] ? values : p);
        setPackages(newPackages);
    };

    return (
        <div className="package-list-container">
            <div className="package-list">
                {packages.map((values, index) =>
                    <Ticket Icon={DraftsIcon}>
                        <AddPackage
                            key={index}
                            index={index}
                            values={values}
                            addButton={index === packages.length - 1}
                            onAdd={addPackage}
                            onDelete={deletePackage}
                            onChange={onChange}
                        />
                    </Ticket>
                    
                )}
            </div>
            <div className="add-button">
                <Tooltip title="Add Packages">
                    <Fab color="primary" aria-label="add" onClick={addPackage}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
        </div>
    );
};

export default PackagesList;
