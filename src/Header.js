import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as Logo } from './logo.svg';
import './Header.scss';
import { useState } from 'react';
import { Divider } from '@mui/material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';


const pages = [{ en: 'Cards', he: 'כרטיסים' }, { en: 'Expenses', he: 'הוצאות' },];
const title = 'Giftcards';
const langs = [{ code: 'en', name: 'English', icon: getUnicodeFlagIcon('US'), isRtl: false }, { code: 'he', name: 'עברית', icon: getUnicodeFlagIcon('IL'), isRtl: true },]

function Header({ setPage, lang, setLang, setGiftcardsDB }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [searchVal, setSearchVal] = useState();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        if (page) setPage(page.en);
    };

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const handleLang = (lang) => {
        console.log({ lang });
        setLang(lang);
        if (langs.filter(l => l.code === lang)[0].isRtl) document.body.classList.add('rtl')
        else document.body.classList.remove('rtl');
    }

    const handleSearch = (ev) => {
        const value = ev.target.value;
        setSearchVal(value);
        const giftcardsDB = JSON.parse(localStorage.getItem('giftcardsDB') || '[]');
        const res = giftcardsDB.filter(gc => Object.values(gc).some(v => typeof v === 'string' ? v.toLowerCase().includes(value.toLowerCase()) : v?.title?.toLowerCase()?.includes(value.toLowerCase())));
        setGiftcardsDB(res)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo className='logo' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu(null)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page[lang]} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{page[lang]}</Typography>
                                </MenuItem>
                            ))}
                            <Divider sx={{ my: 0.5 }} />
                            {langs.map((lng) => (
                                <MenuItem key={lng.code} onClick={() => { handleLang(lng.code); handleCloseNavMenu(null) }}>
                                    <Typography textAlign="center" fontWeight={lng.code === lang ? 900 : 400}>{lng.icon} {lng.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '0rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            minWidth: 'fit-content'
                        }}
                    >
                        {title}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page[lang]}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page[lang]}
                            </Button>
                        ))}
                        <Divider sx={{ my: 0.5 }} />
                        {langs.map((lng) => (
                            <Button
                                key={lng.code}
                                onClick={() => handleLang(lng.code)}
                                sx={{ my: 2, color: 'white', display: 'block', fontWeight: lng.code === lang ? 900 : 400 }}
                            >
                                {lng.icon} {lng.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                        direction: 'initial',
                        position: 'relative',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255, 0.25)',
                        },
                        marginLeft: 0,
                        width: '100%',
                        height: '2rem',
                        marginLeft: { sm: '10px' },
                        width: { sm: 'auto' },
                        display: 'flex'
                    }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <InputBase
                            placeholder={lang === 'he' ? '...חיפוש' : "Search…"}
                            inputProps={{ 'aria-label': 'search', }}
                            value={searchVal}
                            onChange={handleSearch}
                            sx={{
                                color: 'inherit',
                                width: '100%',
                                '& .MuiInputBase-input': {
                                    padding: '1px 1px 1px 0px',
                                    textAlign: 'start',
                                    unicodeBidi: 'plaintext',
                                    // vertical padding + font size from searchIcon
                                    paddingLeft: `calc(1em + 30px)`,
                                    width: { sm: '12ch' },
                                    '&:focus': {
                                        width: { sm: '20ch' },
                                    },

                                },
                            }}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;