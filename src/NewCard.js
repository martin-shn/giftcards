import { Button, Box, FormControl, ImageList, ImageListItem, Input, InputLabel, InputAdornment, Popper, Fab } from "@mui/material";
import JsBarcode from "jsbarcode";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export function NewCard({ strings, lang, setGiftcardsDB, setIsPopoverOpen, card }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [brand, setBrand] = useState(itemData[0]);
    const [amount, setAmount] = useState();
    const [bgc, setBgc] = useState('#8aa7ff');
    const [anchorEl, setAnchorEl] = useState(null);

    const isView = Boolean(card);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!card) return;
        setName(card.name);
        setNumber(card.number);
        setBrand(card.brand);
        setAmount(card.amount);
    }, [card]);

    useEffect(() => {
        if (!number) return;
        console.log(number);
        JsBarcode('#barcode', number.replace(/[^\d]/g, '') || 0);
    }, [number]);

    const mobileCheck = () => {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    const saveCard = () => {
        if (!name || !number) return;
        const newDB = JSON.parse(localStorage.getItem('giftcardsDB') || '[]');

        const idx = newDB.findIndex(gc => gc.id === card.id);
        newDB[idx] = {
            id: Math.random().toString(16).slice(2), name, number, brand, amount, expenses: [], bgc
        };
        localStorage.setItem('giftcardsDB', JSON.stringify(newDB));
        setGiftcardsDB(newDB);
        setIsPopoverOpen.off();
    }

    const createCard = () => {
        if (!name || !number) return;
        const newDB = [...(JSON.parse(localStorage.getItem('giftcardsDB') || '[]')), {
            id: Math.random().toString(16).slice(2), name, number, brand, amount: amount || 0, expenses: [], bgc
        }];
        localStorage.setItem('giftcardsDB', JSON.stringify(newDB));
        setGiftcardsDB(newDB);
        setIsPopoverOpen.off();
    }

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        !open && setTimeout(() => {
            JsBarcode('#big-barcode', number.replace(/[^\d]/g, '') || 0);
        }, 1000);
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: '80vw', height: '75vh', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
            <Fab size="small" color="primary" aria-label="close" sx={{ position: 'absolute', top: 5, right: 5 }} onClick={() => setIsPopoverOpen.off()}>
                <CloseIcon />
            </Fab>
            <h3 style={{ textAlign: 'center', margin: 0 }}>{strings[lang].new.title}</h3>
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="card-name" sx={{ width: '100%' }}>{strings[lang].new.name}</InputLabel>
                <Input id="card-name" onChange={({ target }) => setName(target.value)} value={name} />
            </FormControl>
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="card-number" sx={{ width: '100%' }}>{strings[lang].new.number}</InputLabel>
                <Input id="card-number" type="tel" onChange={({ target }) => { setNumber(target.value) }} value={number} />
            </FormControl>
            <svg id='barcode' onClick={handleClick}></svg>
            <Popper id='barcode-popper' open={open} anchorEl={anchorEl} sx={{ zIndex: 9999 }}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'white' }}>
                    <svg id='big-barcode'></svg>
                </Box>
            </Popper>
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="card-amount" sx={{ width: '100%' }}>{strings[lang].new.amount}</InputLabel>
                <Input id="card-amount" type="number" value={amount} onChange={({ target }) => setAmount(target.value)} startAdornment={<InputAdornment position="start">{strings[lang].cards.currency}</InputAdornment>} />
            </FormControl>
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="card-brand" sx={{ width: '100%' }}>{strings[lang].new.brand}</InputLabel>
                <Input id="card-brand" type="text" value={brand.title} onChange={({ target }) => setBrand({ img: '', title: target.value })} endAdornment={<InputAdornment position="end"><MuiColorInput label={strings[lang].new.bgc} format="hex" value={bgc} onChange={setBgc} /></InputAdornment>} />
            </FormControl>
            <ImageList cols={mobileCheck() ? 2 : 3} sx={{ paddingBlock: '20px' }}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img} sx={{ border: brand.img === item.img ? '2px solid black' : 0 }}>
                        <img
                            srcSet={`${item.img}`}
                            src={`${item.img}`}
                            alt={item.title}
                            loading="lazy"
                            onClick={() => { setBrand(item) }}
                        />
                    </ImageListItem>
                ))}
                <ImageListItem sx={{ border: brand.img === '' ? '2px solid black' : 0, aspectRatio: 1 }} onClick={() => { setBrand({ img: '', title: strings[lang].new.else }); document.querySelector('#card-brand').focus(); }}>
                    <label style={{ display: 'grid', placeContent: 'center', width: '100%', height: '100%', background: '#3b8ad9', textAlign: 'center' }}>{strings[lang].new.else}</label>
                </ImageListItem>
            </ImageList>
            <div style={{ width: '100%', display: 'flex' }}>
                <Button variant='contained' onClick={createCard} sx={{ margin: 'auto' }}>{isView ? strings[lang].new.duplicate : strings[lang].new.save}</Button>
                {isView && <Button variant='contained' onClick={saveCard} sx={{ margin: 'auto' }}>{strings[lang].new.save}</Button>}
            </div>
        </Box>
    )
}

const itemData = [
    {
        img: 'https://buyme.co.il/imagesnew/siteHeader/headerLogo.png?v=1698221833263',
        title: 'Buyme',
    },
    {
        img: 'https://www.chamber.org.il/media/167281/tav_hazhav_e.jpg?width=301&height=301&mode=max',
        title: 'Golden card',
    },
    {
        img: 'https://shoesonline.co.il/wp-content/themes/shoesolnew/images/vouchers/ramilevired.png',
        title: 'Rami Levi',
    },

];