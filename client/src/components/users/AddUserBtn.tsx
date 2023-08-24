import React from 'react'
import { Button, Typography } from '@mui/material';
import Add from '@mui/icons-material/AddOutlined';

export interface AddUserBtnProps {
  handleOnClick: () => void;
}

const handleOnClick = () => {
  console.log()
}

export const AddUserBtn: React.FC<AddUserBtnProps> = ({handleOnClick}) => {
  return (
    <Button variant="contained" color="success" onClick={handleOnClick} sx={{marginLeft:'10px', marginRight:'10px'}}>
      <Add sx={{fontSize:'21px'}}/> 
      <Typography sx={{fontSize:'18px', fontWeight:'500', marginLeft:'9px'}}> USER</Typography> 
    </Button>
  )
}

