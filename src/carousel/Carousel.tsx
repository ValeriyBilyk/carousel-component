import { Navigation } from "./Navigation";
import { List } from "./List";
import { useState } from "react";
import { Box, Popover } from "@mui/material";

export const Carousel = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <div>
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <Navigation setTaxRulesOpened={handleClick}/>
        </Box>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <List />
        </Popover>
    </div>
}
