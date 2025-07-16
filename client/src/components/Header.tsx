//1
// import React from 'react';
// import { AppBar, Toolbar, Typography, InputBase, Box, IconButton } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
// import MusicNoteIcon from '@mui/icons-material/MusicNote';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchBox = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: 4,
//   backgroundColor: '#fff',
//   border: '1px solid black',
//   marginRight: theme.spacing(2),
//   width: 120,
// }));

// const StyledInput = styled(InputBase)(({ theme }) => ({
//   padding: theme.spacing(0.5, 1),
//   width: '100%',
// }));

// const Header = () => {
//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', color: 'black', boxShadow: 'none' }}>
//       <Toolbar sx={{ justifyContent: 'space-between', minHeight: 35 }}>
//         {/* Left side: search */}
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <SearchBox



//2
import React from 'react';
import { AppBar, Toolbar, InputBase, Typography, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', color: 'black', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* צד ימין - קטגוריות וחיפוש */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            קטגוריות
          </Typography>
          <SearchIcon sx={{ color: '#1976d2' }} />
          <InputBase
            placeholder=""
            sx={{
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '4px',
              padding: '2px 8px',
              width: '120px',
              fontSize: '14px',
              direction: 'rtl'
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            חיפוש
          </Typography>
        </Box>

        {/* צד שמאל - לוגו וטקסט */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton disableRipple>
            <MusicNoteIcon sx={{ color: 'purple' }} />
          </IconButton>
          <Typography sx={{ fontFamily: 'cursive', color: 'red', fontSize: '1.2rem' }}>
            Music forum
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
