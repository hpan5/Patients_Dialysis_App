import React, { useDispatch, useSelector } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const handleAddBtnClick = async () => {
    
}

const NavBar = () => {
    return (
        <Box component="div" sx={{ '& > :not(style)': { m: 1 }, display: 'flex' }}>
            <Fab color="primary" aria-label="add" onClick={handleAddBtnClick}>
                <AddIcon />
            </Fab>
        </Box>
    )
    
}

export default NavBar;