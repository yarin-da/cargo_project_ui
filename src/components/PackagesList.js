import {useReducer, useState} from "react";
import AddPackage from "./AddPackage";
import Package from "./Package";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import {Button, Tooltip, Pagination, PaginationItem} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SummaryModal from "./SummaryModal";
import CustomText from "./CustomText";
import { t } from "i18next";

const PackagesList = ({ units, packages, setPackages, currentPackage, setCurrentPackage }) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [showPackageView, setShowPackageView] = useState(false);

    const addPackage = () => {
        if (currentPackage === packages.length) {
            setCurrentPackage(packages.length + 1);
        }
        setPackages(prev => [...prev, new Package()]);
    }

    const deletePackage = (values) => {
        const newPackages = packages.filter(p => p['id'] !== values['id']);
        if (newPackages.length !== 0) {
            if (newPackages.length < currentPackage) {
                setCurrentPackage(newPackages.length);
            }
            setPackages(newPackages);    
        }
    };

    const resetPackage = (values) => {
        values['type'] = '';
        values['canRotate'] = false;
        values['canStackAbove'] = false;
        values['height'] = 0;
        values['width'] = 0;
        values['depth'] = 0;
        values['amount'] = 0;
        values['weight'] = 0;
        values['priority'] = 0;
        values['profit'] = 0;
        forceUpdate();
    }

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
                <PaginationItem {...item} />
            </Tooltip>
        );
    };

    return (

        packages.length <= 0 ? <></> :
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CustomText 
                text="packageDetails" 
                style={{
                    alignSelf: 'center',
                    marginBottom: '20px',
                }}
                variant="h4" 
            />
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
                <Tooltip title={t('viewAllPackages')}>
                    <Button 
                        onClick={() => setShowPackageView(true)}
                    >
                        <ManageSearchIcon fontSize="large" />
                    </Button>
                </Tooltip>
                <Tooltip title={t('addPackages')}>
                    <Button aria-label="add" onClick={addPackage}>
                        <AddIcon fontSize="large" />
                    </Button>
                </Tooltip>
                <Tooltip title={t('deletePackages')}>
                    <Button 
                        onClick={() => deletePackage(packages[currentPackage - 1])}
                    >
                        <DeleteIcon fontSize="large" />
                    </Button>
                </Tooltip>
                <Tooltip title={t('resetPackage')}>
                    <Button 
                        onClick={() => resetPackage(packages[currentPackage - 1])}
                    >
                        <RefreshIcon fontSize="large" />
                    </Button>
                </Tooltip>
            </div>
            <div className="package-list">
                <AddPackage
                    index={currentPackage - 1}
                    values={packages[currentPackage - 1]}
                    onDelete={deletePackage}
                    onChange={onChange}
                />
            </div>
            <div className="pagination">
                <Pagination 
                    page={currentPackage}
                    count={packages.length} 
                    onChange={(_, pageNumber) => setCurrentPackage(pageNumber)}
                    size="large"
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    renderItem={CustomPaginationItem}
                    showFirstButton
                    showLastButton
                />
            </div>
            <SummaryModal 
                units={units} 
                packages={packages} 
                setCurrentPackage={setCurrentPackage} 
                showPackageView={showPackageView}
                setShowPackageView={setShowPackageView}
            />
        </div>
    );
};

export default PackagesList;
