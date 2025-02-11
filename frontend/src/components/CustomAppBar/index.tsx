import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Badge } from "@mui/material";
import io from "socket.io-client";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import CustomIconButton from "../CustomIconButton";
import { useNavigate } from 'react-router-dom';
import constants from "../../service/constants";

interface Props {
    title: string;
}

const CustomAppBar = ({ title }: Props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [ messageCount, setMessageCount ] = useState(0);

    const socket = io(constants.SERVER_ADDRESS, {
        auth: { token },
    })

    useEffect(() => {
        socket.on("connected", () => {
            console.log(socket);
        });

        socket.on("connected profile", (profile) => {
            console.log(profile);
        });

        socket.on("disconnected", () => {
            console.log(socket);
        });

        socket.on("post", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });

        socket.on("comment", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });

        socket.on("comment-like", (data) => {
            console.log(data);
            setMessageCount((count) => count + 1);
        });

        socket.on("connect_error", (error) => {
            console.log(error);
        });

        return () => {
            socket.off();
        }
    }, [token, socket]);

    const handleClickEmail = () => {
        if(messageCount) {
            setMessageCount(0);
            window.location.reload();
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    noWrap
                    component="div"
                    sx={{ display: {xs: "none", sm: "block" }}}
                >
                    { title }
                </Typography>
                <Box sx={{ flexGrow: 1 }}/>
                <Box sx={{ display: { xs: "none", md: "flex" }}}>
                    <CustomIconButton 
                        label="Show Home" 
                        onCLickCallback={() => navigate('/home')}
                    >
                        <HomeIcon />
                    </CustomIconButton>
                    <CustomIconButton 
                        label="notifications" 
                        onCLickCallback={handleClickEmail}
                    >
                        <Badge badgeContent={messageCount} color="secondary">
                            <EmailIcon/>
                        </Badge>
                    </CustomIconButton>
                    <CustomIconButton 
                        label="Show Edit" 
                        onCLickCallback={() => navigate('/create')}
                    >
                        <EditIcon />
                    </CustomIconButton>
                    <CustomIconButton 
                        label="Show Profiles" 
                        onCLickCallback={() => navigate('/profiles')}
                    >
                        <GroupIcon />
                    </CustomIconButton>
                    <CustomIconButton 
                        label="Show Profile" 
                        onCLickCallback={() => navigate('/profile')}
                    >
                        <AccountCircleIcon />
                    </CustomIconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;