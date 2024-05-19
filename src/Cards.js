import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, FormControl, IconButton, Input, InputLabel, Paper, Popover, Typography, styled } from "@mui/material";
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useBoolean from "./hooks/useBoolean";
import { NewCard } from "./NewCard";
import JsBarcode from "jsbarcode";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const errors = { noCards: { en: 'No Cards To Show', he: 'אין כרטיסים להצגה' } };
const menu = [{ en: 'New Card', he: 'כרטיס חדש', icon: <AddCircleIcon />, command: 'newCard' }];
const strings = {
    en: {
        new: {
            title: 'Create new card',
            name: 'Giftcard name',
            number: 'Giftcard number',
            amount: 'Initial amount',
            brand: 'Giftcard brand',
            else: 'A different brand',
            save: 'Save',
            duplicate: 'Duplicate',
        },
        cards: {
            currency: 'ILS'
        },
    },
    he: {
        new: {
            title: 'יצירת גיפטקארד חדש',
            name: 'כינוי לגיפטקארד',
            number: 'מספר הגיפטקארד',
            amount: 'סכום התחלתי',
            brand: 'מותג',
            else: 'מותג אחר שאינו ברשימה',
            save: 'שמור',
            duplicate: 'שכפל',
        },
        cards: {
            currency: 'ש״ח'
        },
    }
}

function Cards({ giftcardsDB, setGiftcardsDB, lang }) {
    console.log({ giftcardsDB });

    const [expanded, setExpanded] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useBoolean(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuCmp, setMenuCmp] = useState(<></>);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMenuClick = (ev, command, ...rest) => {
        setAnchorEl(ev.currentTarget);
        console.log({ command });
        setIsPopoverOpen.on();
        switch (command) {
            case 'newCard':
                setMenuCmp(<NewCard strings={strings} giftcardsDB={giftcardsDB} setGiftcardsDB={setGiftcardsDB} lang={lang} setIsPopoverOpen={setIsPopoverOpen} />)
                break;

            case 'viewCard':
                setMenuCmp(<NewCard strings={strings} giftcardsDB={giftcardsDB} setGiftcardsDB={setGiftcardsDB} lang={lang} setIsPopoverOpen={setIsPopoverOpen} card={rest[0]} />)
            default:
                break;
        }
    }

    useEffect(() => {
        if (!giftcardsDB.length) return;
        giftcardsDB.forEach(gc => {
            JsBarcode(`#barcode-${gc.number}`, gc.number);
        })
    }, [giftcardsDB]);

    return (
        <div className="cards">
            <Box>
                {menu.map(m => <Button key={m.command} variant='contained' startIcon={m.icon} sx={{ direction: 'initial' }} onClick={(ev) => handleMenuClick(ev, m.command)}>{m[lang]}</Button>)}
            </Box>
            <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: lang === 'he' ? 'left' : 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: lang === 'he' ? 'right' : 'left',
                }}
                anchorEl={anchorEl}
                open={isPopoverOpen}
                onClose={() => setIsPopoverOpen.off()}
                sx={{ background: 'rgba(0,0,0,0.4)' }}
            >
                {menuCmp}
            </Popover>
            <Paper elevation={0} sx={{ display: 'flex', gap: '10px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {giftcardsDB.length ? giftcardsDB.map(gc => (
                    <Card key={gc.number} elevation={5} sx={{ maxWidth: '45%' }} onClick={(ev)=>handleMenuClick(ev, 'viewCard', gc)} >
                        <CardHeader
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={gc.name}
                            subheader={gc.brand.title}
                        />
                        <CardMedia
                            component="img"
                            height="50"
                            image={gc.brand.img}
                            alt={gc.brand.title}
                            sx={{objectFit:'contain'}}
                        />
                        <CardContent>
                            <Typography variant="h5" color="text.secondary">
                                {gc.amount} {strings[lang].cards.currency}
                            </Typography>
                            <svg id={`barcode-${gc.number}`}></svg>
                        </CardContent>
                    </Card>)
                ) : <h3>{errors.noCards[lang]}</h3>}
            </Paper>
        </div>
    );
}

export default Cards;
