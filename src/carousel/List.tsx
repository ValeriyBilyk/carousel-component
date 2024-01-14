import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent, SyntheticEvent } from "react";
import { CHANGE_TAX_RULE } from "./Carousel";

export const List = ({state, dispatch}: {state: any, dispatch: any}) => {
    const allChecked = state.transformedTaxRules.filter((taxRule: any) =>
        taxRule.checked).length === state.transformedTaxRules.length
    const accordionOnChange = (event: SyntheticEvent) => {
        event.stopPropagation()
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, taxRuleName: string) => {
        dispatch({ type: CHANGE_TAX_RULE, taxRuleName, checked: event.target.checked })
    }

    return <div>
        <Accordion style={{marginBottom: 0}}>
            <AccordionSummary onClick={accordionOnChange}>
                <Checkbox
                    checked={allChecked}
                    indeterminate={!allChecked}
                />
                All Award Letters
            </AccordionSummary>
        </Accordion>
        {state.transformedTaxRules.map((taxRule: any) => {
            return <Accordion style={{marginBottom: 0, marginTop: 0}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Checkbox checked={taxRule.checked} onChange={(event) => {
                        handleCheckboxChange(event, taxRule.taxRuleName)
                    }}/>
                    {taxRule.taxRuleName}
                    ({taxRule.grants.length} Grants)
                </AccordionSummary>
                <AccordionDetails>
                    {taxRule.grants.map((grant: any) => grant)}
                </AccordionDetails>
            </Accordion>
        })}
    </div>
}
