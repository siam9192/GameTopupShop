import { queryClient } from '@/provider/Provider'
import { updateAdministratorLevelMutation } from '@/query/services/administrator'
import { Administrator } from '@/types/administrator.type'
import { AdministratorLevel } from '@/types/user.type'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
  administrator:Administrator,
  onClose:()=>void|any
}
function UpdateAdministratorLevelDialog({administrator,onClose}:Props) {
  const {mutate,isPending} =  updateAdministratorLevelMutation()
  const [level,setLevel] =  useState(administrator.level)

  function updateLevel () {
    mutate({
      id:administrator._id,
      level
    },{
      onSuccess:(data)=>{
        onClose()
        queryClient.invalidateQueries({queryKey:["getAdministrators"]})
        toast.success(data.message)
      },
      onError: (data)=>{
        onClose()
        toast.error(data.message)
      }
    })
  } 

  return (
    <Dialog open fullWidth onClose={onClose}>
         <DialogTitle>Change <span className='text-primary'>{administrator.fullName}</span> Level</DialogTitle> 
      
           <DialogContent>
              <FormControl>
  
      <RadioGroup
        row
        onChange={(e)=>setLevel(e.target.value as AdministratorLevel)}
        defaultValue={administrator.level}
      >
       {
        Object.values(AdministratorLevel).map(level=>(
           <FormControlLabel key={level} value={level} control={<Radio />} label={level.replace('_',' ')} />
        ))
       }
       
      
      </RadioGroup>
    </FormControl>
           </DialogContent>
         
         <DialogActions>
           <Button color='inherit' onClick={onClose}>Close</Button>
            <Button disabled={isPending||administrator.level === level}  onClick={updateLevel}>Save</Button>
         </DialogActions>
       </Dialog>
  )
}

export default UpdateAdministratorLevelDialog