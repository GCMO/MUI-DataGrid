import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Box,  IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
  // Material Icons

import Delete from '@mui/icons-material/DeleteOutlined';


// Files
import { User } from './UserDetails';
import {AddUserBtn } from './AddUserBtn'; 
// import {DeleteUserBtn} from './DeleteUserBtn';

interface UsersProps {
  searchQuery: string;  
}

export const Users: FC<UsersProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => {
        console.error(err);
        setUsers([]);
      });
      // console.log(setUsers);
    }, []);

  const columns: GridColDef[] = [
    // { field: 'number', headerName: '#', width: 50, renderCell:(params: any) => {console.log(params); const rowIndex = filteredUsers.findIndex(user => user._id === params.rowNode.id) + 1;
    //   return <p>{params.rowIndex + 1}</p> }},
    { field: 'firstName', headerName: 'FIRST NAME', width: 120, renderCell: (params: any) => <p>{params.value}</p> },
    { field: 'lastName', headerName: 'LAST NAME', width: 120, renderCell: (params: any) => <p>{params.value}</p> },
    { field: 'email', headerName: 'EMAIL', width: 300, renderCell: (params: any) => <p>{params.value}</p> },
    { field: 'createDateTime', headerName: 'DATE & TIME', width: 200, renderCell: (params: any) => <p>{params.value}</p> },
    { field: 'id', headerName: 'ID', width: 360, renderCell: (params: any) => <NavLink to={`/users/${params.value}`}>{params.value}</NavLink> },
  ];

  const filteredUsers = users.filter((user) => {({ ...user, id: user._id })
    return (
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRowSelection = (params: any) => {
    console.log("Params:", params);
    if (params && params.data) {
      setSelectedRows(params.data.map((user: User) => user._id));
    } else {
      console.error("Invalid params or selection:", params);
    }
  };
  

  const handleSelectedUsersDelete = async () => {
    try {
      const deletePromises = selectedRows.map(async (userId) => {
        const res = await fetch(`http://localhost:5000/users/${userId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          return userId; // Return the deleted user's ID
        } else {
          return null; // null for failed deletions
        }
      });
      const deletedUserIds = await Promise.all(deletePromises);
      const fullyDeletedUser = deletedUserIds.filter((id) => id !== null);

      // Update users list & clear selected rows
      setUsers((prevUsers) =>
      prevUsers.filter((user) => !fullyDeletedUser.includes(user._id)));
      setSelectedRows([]);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Box width="95%" height="auto" margin="22px" boxShadow='20' border='solid 3px'>
      <IconButton
        color="error"
        aria-label="delete"
        onClick={handleSelectedUsersDelete}
        // disabled={selectedRows.length === 0}
      >
        <Delete sx={{fontSize:'33px'}}  />
      </IconButton>
      <AddUserBtn/>
      <DataGrid
        rows={filteredUsers
          .map(user => ({ ...user, id: user._id })) 
          .filter((user) => !selectedRows.includes(user._id))} 
        columns={columns}
        sx={{fontSize:'18px'}}
        pageSizeOptions={[ 25, 50, 100]}
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleRowSelection}
      />
    </Box>
  );
};
