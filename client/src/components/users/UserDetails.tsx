import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createDateTime: number;
}

interface UserDetailsParams extends Record<string, string> {
  id: string;
}

export const UserDetails: FC = () => {
  const { id } = useParams<UserDetailsParams>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
      console.log(setUser)
  }, [id]);
  console.log(setUser)

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'createDateTime', headerName: 'Date & Time', width: 200 },
  ];

  return (
    <Box width="65%" height="200px" margin="22px" padding='12px' boxShadow='20' border='solid 3px'>
      <Typography variant="h4"  >
        User Details
      </Typography>
      {user ? (
       <Card>
       <CardContent>
         <DataGrid
           rows={[user]}
           columns={columns}
           autoHeight
           hideFooterPagination
           getRowId={(row) => row._id}
           pageSizeOptions={[1]}
         />
       </CardContent>
     </Card>
      ) : (
        <Typography variant="h6" color="worning">
          User not found or an error occurred while fetching user data.
        </Typography>
      )}
    </Box>
  );
};