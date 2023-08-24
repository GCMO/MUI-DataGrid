import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Search } from './components/search/Search';
import { SearchIconWrapper } from './components/search/SearchIconWrapper';
import { StyledInputBase } from './components/search/StyledInputBase';
import {Users} from './components/users/Users';
import {FullFeaturedCrudGrid} from './components/users/FullFeaturedCrudGrid';


function App() {
  
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery( event.target.value);
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{display: {xs: 'none', sm: 'block'}}}>
            <Box sx={{marginTop:'9px'}}>
              <NavLink to="/users"> <img src='/images.png' width="auto" height="37" /></NavLink>
            </Box>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Find user"
              inputProps={{'aria-label': 'search'}}
              value={searchQuery}
              onChange={handleSearch}
              />
          </Search>
        </Toolbar>
      </AppBar>
      <FullFeaturedCrudGrid searchQuery={searchQuery}/>
      {/* <Users searchQuery={searchQuery}/> */}
      {/* <Outlet /> */}
    </Box>
  );
}

export default App;
