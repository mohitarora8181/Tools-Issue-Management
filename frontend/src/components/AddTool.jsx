import { Fragment, React, forwardRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTool({ open, setOpen }) {

    const [toolName, settoolName] = useState("");
    const [category, setcategory] = useState("");
    const [image, setimage] = useState("");
    

    const handleAdd = async () => {
        console.log({ toolName, category, image:image[0] })
        await axios.post("http://localhost:3500/api/tools/add", {
            name: toolName,
            category,
            image:image[0]
        }).then(()=>{
            setOpen(false);
        })
    }

    useEffect(() => {
        settoolName("");
        setcategory("");
        setimage("");
    }, [open])

    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add Tool"}</DialogTitle>
                <DialogContent>
                    <form className='p-10 gap-8 bg-white flex flex-col align-middle'>
                        <Box
                            className="self-center"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField fullWidth value={toolName} label="Tool Name" id="ToolName" onChange={(e) => settoolName(e.target.value)} />
                        </Box>

                        <FormControl>
                            <InputLabel id="demo-simple-select-autowidth-label">Select Tool Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={category}
                                onChange={(e) => { setcategory(e.target.value) }}
                                fullWidth
                                label="Select Tool Category"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Screw Driver"}>Screw Driver</MenuItem>
                                <MenuItem value={"Wrench"}>Wrench</MenuItem>
                                <MenuItem value={"Plier"}>Plier</MenuItem>
                                <MenuItem value={"Hammer"}>Hammer</MenuItem>
                            </Select>
                        </FormControl>
                        <Box className="flex gap-5 cursor-not-allowed">
                            <Button
                                variant="contained"
                                component="label"
                                disabled
                            >
                                Upload Tool Image
                                <input
                                    type="file"
                                    hidden
                                    accept='image/*'
                                    onInput={(e) => setimage(e.target.files)}
                                />
                            </Button>
                            <p>{image && image[0].name}</p>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
