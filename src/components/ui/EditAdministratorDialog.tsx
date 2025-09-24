import { Administrator } from '@/types/administrator.type'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

interface Props {
  administrator:Administrator,
  onClose:()=>void|any
}
function EditAdministratorDialog({administrator,onClose}:Props) {
  return (
    <Dialog open fullWidth onClose={onClose}>
         <DialogTitle>Edit {administrator.fullName}</DialogTitle>
       
      
           <DialogContent>
             
           </DialogContent>
         
         <DialogActions>
           <Button onClick={onClose}>Close</Button>
         </DialogActions>
       </Dialog>
  )
}

export default EditAdministratorDialog