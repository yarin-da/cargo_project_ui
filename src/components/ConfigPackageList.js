import {useReducer, useState} from "react";
import AddPackage from "./AddPackage";
import Package from "./Package";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
    Button, 
    Tooltip, 
    Pagination, 
    PaginationItem,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Modal,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SummaryModal from "./SummaryModal";
import CustomText from "./CustomText";
import { t } from "i18next";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/CheckRounded';
import CrossIcon from '@mui/icons-material/ClearRounded';

const ConfigPackageList = ({ units, packages, setPackages, currentPackage, setCurrentPackage }) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [showPackageView, setShowPackageView] = useState(false);
    const [editPackageType, setEditPackageType] = useState('');
    const [showEdit, setShowEdit] = useState(false);

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
    
    const keys = ['type','width','height','depth','weight','amount','profit','priority'];
    const columns = keys.map(key => 
        ({
            field: key,
            headerName: t(key),
        })
    );
    columns.push({
        field: 'canStackAbove',
        headerName: t('canStackAbove'),
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
        width: 120,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: ({ row }) => {
            return (
                <div>
                    <Button onClick={() => {
                        setEditPackageType(row['type']);
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

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={packages}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                hideFooter={packages.length <= 100}
            />
            <Modal 
                open={showEdit} 
                onClose={() => setShowEdit(false)}
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
                    {/* TOOD: 
                        Add form instead - and change packages on 'Save' 
                        (check that values are valid - e.g. there's a type and width above 0) */}
                    <AddPackage values={{...packages.find(x => x['type'] === editPackageType)}} onChange={onChange} />
                </div>
            </Modal>
        </div>
    );

    // return (
    //     <TableContainer component={Paper}>
    //         <Table aria-label="simple table">
    //             <TableHead>
    //             <TableRow>
    //                 <TableCell>
    //                     {t('type')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('width')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('height')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('depth')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('weight')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('amount')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('priority')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('profit')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('canRotate')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('canStackAbove')}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {t('actions')}
    //                 </TableCell>
    //             </TableRow>
    //             </TableHead>
    //             <TableBody>
    //             {packages.map(pkg => (
    //                 <TableRow key={pkg['type']}>
    //                 <TableCell component="th" scope="row">
    //                     {pkg['type']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['width']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['height']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['depth']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['weight']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['amount']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['priority']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['profit']}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['canRotate'] ? 
    //                         <CheckIcon htmlColor="green" /> : 
    //                         <CrossIcon htmlColor="red" />
    //                     }
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {pkg['canStackAbove'] ?
    //                         <CheckIcon htmlColor="green" /> : 
    //                         <CrossIcon htmlColor="red" />                    
    //                     }
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     <Button aria-label="edit">
    //                         <EditIcon />
    //                     </Button>
    //                     <Button aria-label="delete">
    //                         <DeleteIcon />
    //                     </Button>
    //                 </TableCell>
    //                 </TableRow>
    //             ))}
    //             </TableBody>
    //         </Table>
    //     </TableContainer>
    // );
};

export default ConfigPackageList;
