import React, {useState, useEffect, FC} from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Box, Button} from '@mui/material';
//Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
//DataGrid
import {GridRowsProp, GridRowModesModel, GridRowModes, DataGrid, GridColDef, GridToolbarContainer, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
// Files
import { User } from './UserDetails';


interface UsersProps {searchQuery: string;  }

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}


export const FullFeaturedCrudGrid:FC<UsersProps> = ({searchQuery}) => {
  const [rows, setRows] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  
  
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => {
        console.error(err);
        setUsers([]);
      });
    }, []);
    
    const columns: GridColDef[] = [
      // {field: 'rowNumber', headerName: '#', width: 70, valueGetter: (params) => params.value  + 1, },
      { field: 'firstName', headerName: 'FIRST NAME', width: 120, renderCell: (params: any) => <p>{params.value}</p> },
      { field: 'lastName', headerName: 'LAST NAME', width: 120, renderCell: (params: any) => <p>{params.value}</p> },
      { field: 'email', headerName: 'EMAIL', width: 300, renderCell: (params: any) => <p>{params.value}</p> },
      { field: 'createDateTime', headerName: 'DATE & TIME', width: 200, renderCell: (params: any) => <p>{params.value}</p> },
      { field: 'id', headerName: 'ID', width: 360, renderCell: (params: any) => {
        console.log('PARAMS',params); 
        return ( <a href={`/users/${params.value}`} onClick={(e) => e.stopPropagation()}>{params.value}</a>
        );}},
      { field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
      getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode) { 
            return [
              <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              sx={{ color: 'primary.main', }}
              />,
              <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              />,
            ];
          }
          return [
            // <GridActionsCellItem
            // icon={<EditIcon />}
            // label="Edit"
            // className="textPrimary"
            // onClick={handleEditClick(id)}
            // color="inherit"
            // />,
            <GridActionsCellItem
            icon={<DeleteIcon sx={{fontSize:"26px"}}
            />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
            size="large"
            />,
          ];
        },
      },
    ];
    
    const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(user => ({ ...user, id: user._id }));
    // console.log(filteredUsers);
    
    // EditRowModel
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
    
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
      

    const handleSaveClick = (id: GridRowId) => async () => {
      const updatedRow = rows.find((row) => row._id === id);
      if (!updatedRow) return;
      // POST new user 
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(updatedRow),
        });
    
        if (response.ok) {
          const newUser = await response.json();
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          setRows((oldRows) => oldRows.map((row) => (row._id === id ? newUser : row)));
          setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        } else {
          console.error('Failed to save new user:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error while saving new user:', error);
      }
    };
      
      const handleDeleteClick = (id: GridRowId) => async () => {
        try {
          const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            const updatedUsers = users.filter((user) => user._id !== id);
            setUsers(updatedUsers);
            setRows((oldRows) => oldRows.filter((row) => row._id !== id));
          } else {
            console.error('Failed to delete user:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error while deleting user:', error);
        }
      };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow && editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
    
    const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow: any = { ...newRow, isNew: false };
      const updatedRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row));
      setRows(updatedRows);
      return updatedRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
  };
  
  
  return (
    <Box height='auto' width='95%' margin="22px" boxShadow='20' border='solid 3px'
    sx={{'& .actions': { color: 'text.secondary', }, 
    '& .textPrimary': { color: 'text.primary', },}}
    >
      <DataGrid
        rows={filteredUsers
          .map(user => ({ ...user, id: user._id })) 
          .filter((user) => !selectedRows.includes(user._id))}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSizeOptions={[1, 25, 50, 100]}
        
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: (toolbarProps) => <EditToolbar {...toolbarProps} users={users} />, }}        
        slotProps={{ toolbar: { setRows, setRowModesModel }, }}
        sx={{fontSize:'18px'}}
          />
    </Box>
  );
};

const EditToolbar = (props: EditToolbarProps & { users: User[] }) => {
  const { setRows, setRowModesModel, users } = props; //from prev funcs

  const handleClick = () => {
    const newId = uuidv4();  
    const newRow = { _id: newId, firstName: '', lastName: '', email: '', createDateTime: 0, isNew: true, };

    setRows((oldRows) => [...oldRows, newRow]);    
    setRowModesModel((oldModel) => ({...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="contained" color="success" 
      sx={{margin:'12px'}} 
      startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}