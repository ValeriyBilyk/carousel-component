import { Button, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Navigation = ({state, dispatch}: {state: any, dispatch: any}) => {
    const { selectedGrant } = state
    console.log(state)

    return <div>
        <IconButton>
            <ChevronLeftIcon />
        </IconButton>
        <Button variant="text">{selectedGrant.grant.stakeholderName} {selectedGrant.orderValue}/{selectedGrant.commonAmount}</Button>
        <IconButton>
            <ChevronRightIcon />
        </IconButton>
    </div>
}
