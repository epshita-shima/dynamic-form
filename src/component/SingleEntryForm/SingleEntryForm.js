import { Button, TextField } from '@mui/material'
import React from 'react'
import './SingleEntryForm.css'
import { Formik } from 'formik';
const SingleEntryForm = () => {
  return (
    <div >
   <div className='single-entry-form'>
   <div>
    <label htmlFor="" className='text-style'>Text Field</label> <br></br>
      <TextField id="outlined-basic" variant="outlined" size='small' />
    </div>
    <div style={{marginLeft:'5px'}}>
    <label htmlFor="" className='text-style'>DropDown Field</label> <br></br>
      <TextField id="outlined-basic" variant="outlined" size='small' />
    </div>
    <div style={{marginLeft:'5px'}}>
    <label htmlFor="" className='text-style'>Checkbox Field</label> <br></br>
      <TextField id="outlined-basic" variant="outlined" size='small' />
    </div>
    <div style={{marginLeft:'5px'}}>
    <label htmlFor="" className='text-style'>Date Field</label> <br></br>
      <TextField id="outlined-basic" variant="outlined" size='small' />
    </div>
   <div>
   <Button
            variant="contained"
          >
          Enter
          </Button>
   </div>
   </div>

<Formik
 initialValues={{
   
  }}
  onSubmit={(values, actions) => {
  }}
  render={({ values, setFieldValue, handleSubmit }) => (
    <form onSubmit={''}>

    </form>
  )}
/>

    </div>
  )
}

export default SingleEntryForm
