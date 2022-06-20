import { useState } from "react";
import AddPackageForm from "./AddPackageForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Modal, Stack } from '@mui/material';
import { DataGrid, heIL, enUS } from '@mui/x-data-grid';
import CustomText from "./CustomText";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/CheckRounded';
import CrossIcon from '@mui/icons-material/ClearRounded';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/Config.css'
import '../styles/Util.css'

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

const ConfigPackageList = ({ units, packages, setPackages }) => {
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [editedPackage, setEditedPackage] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [mode, setMode] = useState('edit');

    const { t, i18n } = useTranslation();

    const deleteSelected = () => {
        if (selectedPackages.length > 0) {
            const newPackages = packages.filter(pkg => 
                !selectedPackages.find(x => x === pkg['id'])
            );
            setPackages(newPackages);    
        }
    };

    const deletePackage = (values) => 
        setPackages(curr => curr.filter(p => p['id'] !== values['id']));
    
    const keys = ['type','amount','width','height','depth','weight','profit','priority'];
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
                        setMode('edit');
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

    const onSave = (formPackage) => {
        if (mode === 'add') {
            setPackages(curr => [formPackage, ...curr]);
        } else if (mode === 'edit') {
            const newPackages = [...packages];
            const index = newPackages.findIndex(x => x['id'] === editedPackage['id']);
            newPackages[index] = formPackage;
            setPackages(newPackages);
        }
        setShowEdit(false);
    };

    const locale = i18n.language === 'he' ? heIL : enUS;
    const classes = useStyles();
    return (
        <div className="config-package-list">
            <div className="add-packages-tab">
                <CustomText text="addPackagesTab" variant="h4" />
            </div>
            <div className="packages-buttons">
                <Button variant="contained" sx={{ margin: 1 }} onClick={deleteSelected}>
                    <CustomText text="deleteChecked" className="no-text-transform" />
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ margin: 1 }} 
                    onClick={() => { 
                        setMode('add'); 
                        setEditedPackage({});
                        setShowEdit(true); 
                    }}
                >
                    <CustomText text="add" className="no-text-transform" />
                </Button>
            </div>
            <DataGrid
                localeText={locale.components.MuiDataGrid.defaultProps.localeText}
                className={classes.root}
                rows={packages}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                onSelectionModelChange={(selection) => setSelectedPackages(selection)}
                checkboxSelection
                disableSelectionOnClick
                hideFooter={packages.length <= 100}
                autoHeight
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
            {/* add spacing so that the buttons won't overshadow the table's values */}
            <div className="packages-modal"></div>
            <Modal 
                open={showEdit} 
                onClose={() => setShowEdit(false)}
            >
                <div className="modal-popup" >
                    <AddPackageForm 
                        values={{...editedPackage}} 
                        onSubmit={onSave} 
                        onClose={() => setShowEdit(false)} 
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ConfigPackageList;
