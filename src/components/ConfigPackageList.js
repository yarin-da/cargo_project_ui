import { useState } from "react";
import AddPackage from "./AddPackage";
import Package from "./Package";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomText from "./CustomText";
import { t } from "i18next";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/CheckRounded';
import CrossIcon from '@mui/icons-material/ClearRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

const ConfigPackageList = ({ units, packages, setPackages, currentPackage, setCurrentPackage }) => {
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [editedPackage, setEditedPackage] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState('');

    const deleteSelected = () => {
        if (selectedPackages.length > 0) {
            const newPackages = packages.filter(pkg => 
                !selectedPackages.find(x => x === pkg['id'])
            );
            setPackages(newPackages);    
        }
    };

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

    const onChange = (values) => setEditedPackage({...values});
    
    const keys = ['type','width','height','depth','weight','amount','profit','priority'];
    const isLength = (key) => ['width', 'height', 'depth'].includes(key);
    const isWeight = (key) => ['weight'].includes(key);
    const isCurrency = (key) => ['profit'].includes(key);
    const parseKey = (key) => {
        let parsedKey = t(key);
        if (isLength(key)) {
            parsedKey += ` (${t(units['length'])})`;
        } else if (isWeight(key)) {
            parsedKey += ` (${t(units['weight'])})`;
        } else if (isCurrency(key)) {
            parsedKey += ` ($)`;
        }
        return parsedKey;
    };
    const columns = keys.map(key => 
        ({
            field: key,
            headerName: parseKey(key),
            flex: 1,
        })
    );
    columns.push({
        field: 'canStackAbove',
        headerName: t('canStackAbove'),
        flex: 1,
        renderCell: ({ value }) => {
            return (
                <div>
                    {value ? <CheckIcon htmlColor="green" /> : <CrossIcon htmlColor="red" />}
                </div>
            );
        }
    });
    columns.push({
        field: 'canRotate',
        headerName: t('canRotate'),
        flex: 1,
        renderCell: ({ value }) => {
            return (
                <div>
                    {value ? <CheckIcon htmlColor="green" /> : <CrossIcon htmlColor="red" />}
                </div>
            );
        }
    });
    columns.push({
        field: 'actions',
        headerName: t('actions'),
        minWidth: 160,
        sortable: false,
        renderCell: ({ row }) => {
            return (
                <div>
                    <Button onClick={() => {
                        setEditedPackage({...row});
                        setShowEdit(true);
                    }}>
                        <EditIcon />
                    </Button>
                    <Button onClick={() => deletePackage(row)}>
                        <DeleteIcon />
                    </Button>
                </div>
            );
        }
    });

    const onSave = () => {
        const canSave = editedPackage['type'] && editedPackage['type'].length > 0;
        if (canSave) {
            const newPackages = [...packages];
            const index = newPackages.findIndex(x => x['id'] === editedPackage['id']);
            newPackages[index] = editedPackage;
            setPackages(newPackages);
            onEditClose();    
        } else {
            setError('invalidType');
        }
    };

    const onEditClose = () => {
        setError('');
        setShowEdit(false);
    };

    const classes = useStyles();
    return (
        <div style={{ width: '90%', maxHeight: 'calc(100% - 150px)', overflow: 'hidden' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CustomText text="addPackagesTab" variant="h4" />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{ margin: 1 }}>
                    <CustomText text="add" style={{textTransform: 'none'}} />
                </Button>
                <Button variant="contained" sx={{ margin: 1 }} onClick={deleteSelected}>
                    <CustomText text="deleteChecked" style={{textTransform: 'none'}} />
                </Button>
            </div>
            <DataGrid
                // TODO: NOT ALL ROWS SHOW IF OVERFLOW
                className={classes.root}
                rows={packages}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                onSelectionModelChange={(selection) => setSelectedPackages(selection)}
                checkboxSelection
                disableSelectionOnClick
                hideFooter={packages.length <= 100}
                // TODO: autoHeight?
                column
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            {t("tableNoData")}
                        </Stack>
                    ),
                    NoResultsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            {t("tableNoResults")}
                        </Stack>
                    )
                }}
            />
            <Modal 
                open={showEdit} 
                onClose={onEditClose}
            >
                <div style={{
                    background: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: 25,
                    borderRadius: 25,
                }}>
                    <AddPackage values={{...editedPackage}} onChange={onChange} />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                        <Button 
                            variant="contained" 
                            sx={{ width: 85, height: 50 }}
                            onClick={() => onSave()}
                        >
                            <CustomText text="save" style={{textTransform: 'none'}} />
                        </Button>
                        <Button 
                            sx={{ position: 'absolute', top: 15, right: 5 }}
                            onClick={onEditClose}
                        >
                            <CrossIcon htmlColor="black" fontSize="medium" />
                        </Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                        <CustomText text={error} style={{ color: 'red' }} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ConfigPackageList;
