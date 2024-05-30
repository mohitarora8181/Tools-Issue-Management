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

export default function IssueTool({ open, setOpen, toolInfo }) {


    const [mechanicName, setMechanicName] = useState("");
    const [mobile, setmobile] = useState("");
    const [period, setperiod] = useState("week");

    useEffect(()=>{
        setMechanicName("");
        setmobile("");
        setperiod("week");
    },[open])

    const handleIssue = async () => {
        if(mobile.length != 10 ){
            alert("Phone number should be correct")
            return;
        }
        await axios.post("http://localhost:3500/api/tools/issue", { mechanicName, phone:mobile, period, toolInfo }).then(() => {
        }).then(() => {
            setOpen(false);
        })
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {"Issue Tool"}
                    <span className='w-full'>
                        <p className='text-gray-600 ml-5 mt-5'>Tool Name : {toolInfo.name}</p>
                        <p className='text-gray-600 ml-5'>Tool Category : {toolInfo.category}</p>
                    </span>
                </DialogTitle>
                <DialogContent>
                    <form className='p-10 gap-8 bg-white flex flex-col align-middle'>
                        <Box
                            className="self-center"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField fullWidth label="Mechanic Name" id="MechanicName" onChange={(e) => setMechanicName(e.target.value)} />
                        </Box>

                        <Box
                            className="self-center"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField fullWidth type='number' onChange={(e) => setmobile(e.target.value)} label="Mobile Number" id="MechanicMobile" />
                        </Box>

                        <FormControl>
                            <InputLabel id="demo-simple-select-autowidth-label">Set Time Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                fullWidth
                                label="Set Tool Category"
                                defaultValue={period}
                                onChange={(e) => setperiod(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"week"}>Week</MenuItem>
                                <MenuItem value={"month"}>Month</MenuItem>
                                <MenuItem value={"4months"}>4 months</MenuItem>
                                <MenuItem value={"6months"}>6 months</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleIssue}>Issue Tool</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
