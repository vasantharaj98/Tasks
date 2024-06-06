import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const Popup = ({modalte, open, setOpen}) => {

  const handleClose = () =>{
    setOpen(false);
  } 
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalte}
          </Typography>
          <Button variant='contained' onClick={handleClose} sx={{textAlign:'center', mt: 2}}>Ok</Button>
          </Box>
        </Box>
      </Modal>
  );
}

export default Popup;