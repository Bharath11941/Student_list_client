import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

const DeleteModal = ({deleteModalOpen,handleCloseDeleteModal,handleConfirmDelete}) => {
  return (
    <Modal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' }, // Customize backdrop color and opacity
        }}
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="delete-modal-title" variant="h6" component="h2" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography id="delete-modal-description" variant="body1" component="p" gutterBottom>
            Are you sure you want to delete this row?
          </Typography>
          <Button onClick={handleConfirmDelete} sx={{ mr: 2 }}>
            Yes
          </Button>
          <Button onClick={handleCloseDeleteModal}>
            No
          </Button>
        </Box>
      </Modal>
  )
}

export default DeleteModal
