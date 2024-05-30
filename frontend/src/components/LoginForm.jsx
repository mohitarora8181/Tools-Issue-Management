import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const LoginForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [level , setLevel] = useState("");
    const [image, setImage] = useState(null);

    const [isError, setError] = useState({ name: false, email: false, phone: false, level:false,password: false })

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (e)=>{
        setLevel(e.target.value)
    }

    const handleSubmit = () => {
        if (name.trim().length == 0) {
            setError({ name: true })
            return;
        } else if (email.trim().length == 0) {
            setError({ email: true })
            return;
        } else if (!emailRegex.test(email)) {
            setError({ email: true })
            return;
        } else if (!phone) {
            setError({ phone: true })
            return;
        } else if (phone.length != 10) {
            setError({ phone: true })
            return;
        }else if (level == "") {
            setError({ level: true })
            return;
        } else if (!strongPassRegex.test(password)) {
            setError({ password: true })
            return;
        }


        setError({ name: false, email: false, phone: false, password: false })
        console.log({ name, email, phone, password, image })
    }

    return (
        <form className='absolute top-[10%] p-10 rounded-xl gap-8 left-1/3 w-1/3 bg-white shadow-lg flex flex-col align-middle'>
            <Box
                className="self-center"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                id="NameField"
            >
                <TextField fullWidth error={isError?.name} helperText={isError?.name ? "Name field cannot be empty" : ""} value={name} label="Name" id="Name" onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box
                className="self-center"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <TextField type='email' value={email} error={isError?.email} helperText={isError?.email ? "Email field error" : ""} fullWidth label="Email" id="Email" onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Box
                className="self-center"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <TextField type='number' fullWidth value={phone} label="Mobile Number" error={isError?.phone} helperText={isError?.phone ? "Mobile Number field error" : ""} id="Mobile Number" onChange={(e) => setPhone(e.target.value)} />
            </Box>
            <FormControl error={isError.level}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Level</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={level}
                    onChange={handleChange}
                    fullWidth
                    label="Select Level"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Expert"}>Expert</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"New Recruit"}>New Recruit</MenuItem>
                    <MenuItem value={"Trainee"}>Trainee</MenuItem>
                </Select>
            </FormControl>
            <Box
                className="self-center"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <TextField type='password' error={isError?.password} helperText={isError?.password ? "Password field error" : ""} fullWidth value={password} label="Password" id="Password" onChange={(e) => setPassword(e.target.value)} />
                {isError.password && !strongPassRegex.test(password) && <span className='text-red-500'>
                    <p className='ml-5'>Password contain 1 uppercase</p>
                    <p className='ml-5'>Password contain 1 number</p>
                    <p className='ml-5'>Password contain 1 special character</p>
                    <p className='ml-5'>Password must be of 8 characters</p>
                </span>}
            </Box>
            <Box className="flex gap-5">
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        accept='image/*'
                        onInput={(e) => setImage(e.target.files)}
                    />
                </Button>
                <p>{image && image[0].name}</p>
            </Box>
            <Box
                className="self-center"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} sx={{
                    width: 500,
                    maxWidth: '100%',
                    border: "black",
                    gap: 2
                }}>Sign Up</Button>
            </Box>
        </form>
    )
}

export default LoginForm
