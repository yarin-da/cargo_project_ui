import {useState} from "react";
import AddPackage from "./AddPackage";
import Package from "./Package";
import AddIcon from "@material-ui/icons/Add";
import DraftsIcon from '@mui/icons-material/Drafts';
import Ticket from "./Ticket";
import {Fab, Tooltip, Pagination, PaginationItem} from '@mui/material';

const PackagesList = ({ packages, setPackages }) => {
    const [currentPackage, setCurrentPackage] = useState(1);

    const addPackage = () => {
        if (currentPackage == packages.length) {
            setCurrentPackage(packages.length + 1);
        }
        setPackages(prev => [...prev, new Package()]);
    }

    const deletePackage = (values) => {
        const newPackages = packages.filter(p => p['id'] !== values['id']);
        if (newPackages.length < currentPackage) {
            setCurrentPackage(newPackages.length);
        }
        setPackages(newPackages);
    };

    const onChange = (values) => {
        const newPackages = packages.map(p => p['id'] === values['id'] ? values : p);
        setPackages(newPackages);
    };

    const CustomPaginationItem = (item) => {
        let text = '';
        if (item['type'] === 'page') {
            const index = item['page'] - 1;
            const packageType = packages[index]['type'];
            text = packageType ? packageType : `Package ${index + 1}`;
        }
        return (
            <Tooltip title={text}>
                <span>
                    <PaginationItem {...item} />
                </span>
            </Tooltip>
        );
    };
    
    return (
        <div className="package-list-container">
            {
                packages.length > 0 &&
                <>
                    <div className="package-list">
                        <Ticket Icon={DraftsIcon}>
                            <AddPackage
                                index={currentPackage - 1}
                                values={packages[currentPackage - 1]}
                                onDelete={deletePackage}
                                onChange={onChange}
                            />
                        </Ticket>
                    </div>
                    <div className="pagination">
                        <Pagination 
                            page={currentPackage}
                            count={packages.length} 
                            onChange={(_, pageNumber) => setCurrentPackage(pageNumber)}
                            size="large"
                            variant="outlined"
                            shape="rounded"
                            renderItem={CustomPaginationItem}
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </>
            }
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
