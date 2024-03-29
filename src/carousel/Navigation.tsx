import { Button, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NAVIGATE, useCarouselContext } from "./context";

export const Navigation = ({setTaxRulesOpened}: {setTaxRulesOpened: (event: React.MouseEvent<HTMLButtonElement>) => void}) => {
    const { state, dispatch } = useCarouselContext()
    const { selectedGrant } = state

    const handleNavigationClick = (direction: string) => {
        dispatch({ type: NAVIGATE, direction})
    }

    return <div>
        <IconButton disabled={!selectedGrant.canNavigateBack} onClick={() => {
            handleNavigationClick("back")
        }}>
            <ChevronLeftIcon />
        </IconButton>
        <Button variant="text" onClick={setTaxRulesOpened}>
            {selectedGrant.grant.stakeholderName} {selectedGrant.orderValue + 1}/{selectedGrant.commonAmount}
        </Button>
        <IconButton disabled={!selectedGrant.canNavigateForward} onClick={() => {
            handleNavigationClick("forward")
        }}>
            <ChevronRightIcon />
        </IconButton>
    </div>
}
