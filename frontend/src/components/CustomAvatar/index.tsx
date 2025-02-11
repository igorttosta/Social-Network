import React from "react";
import { Avatar } from '@mui/material';


const CustomAvatar = ({ profileName }: { profileName: string }) => {
    const getInicials = (
        name: string) => 
        name
            .split(" ")
            .slice(0, 2)
            .map((name) => name[0]);

    return (
        <Avatar 
            sx={{ bgcolor: "red" }} 
            arial-label={profileName} 
        >
            {getInicials(profileName)}
        </Avatar>
    )
}

export default CustomAvatar;