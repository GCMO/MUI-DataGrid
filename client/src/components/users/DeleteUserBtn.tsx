import React from 'react'
import { Button } from '@mui/material';

interface DeleteUserBtnProps {
  onClick: () => void;
}

export const DeleteUserBtn: React.FC<DeleteUserBtnProps> = ({onClick}) => {
  return (
    <Button variant="contained" color="error" onClick={onClick} sx={{display:'flex', float:'right'}}>
      DELETE USER
    </Button>
  )
}

