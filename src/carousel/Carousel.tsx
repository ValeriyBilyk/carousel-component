import { Button, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Carousel = () => {
    return <div>
        <IconButton>
            <ChevronLeftIcon />
        </IconButton>
        <Button variant="text">Allan de Neergaard</Button>
        <IconButton>
            <ChevronRightIcon />
        </IconButton>
    </div>
}
