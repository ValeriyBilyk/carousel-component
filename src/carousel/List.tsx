import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent, SyntheticEvent } from "react";
import { CHANGE_TAX_RULE } from "./Carousel";
import ReactCountryFlag from "react-country-flag";

export const List = ({state, dispatch}: {state: any, dispatch: any}) => {
    const allChecked = state.transformedTaxRules.filter((taxRule: any) =>
        taxRule.checked).length === state.transformedTaxRules.length
    const accordionOnChange = (event: SyntheticEvent) => {
        event.stopPropagation()
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, taxRuleName: string) => {
        dispatch({ type: CHANGE_TAX_RULE, taxRuleName, checked: event.target.checked })
    }

    return <div style={{width: 400}}>
        <Accordion style={{marginBottom: 0}}>
            <AccordionSummary onClick={accordionOnChange}>
                <Box sx={{display: "flex", alignItems: "center", fontWeight: "600"}}>
                    <Checkbox
                        checked={allChecked}
                        indeterminate={!allChecked}
                    />
                    All Award Letters
                </Box>
            </AccordionSummary>
        </Accordion>
        {state.transformedTaxRules.map((taxRule: any) => {
            return <Accordion style={{marginBottom: 0, marginTop: 0}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                        <Box sx={{display: "flex", alignItems: "center", fontWeight: "500"}}>
                            <Checkbox checked={taxRule.checked} onChange={(event) => {
                                handleCheckboxChange(event, taxRule.taxRuleName)
                            }}/>
                            <ReactCountryFlag
                                countryCode={taxRule.countryCode}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                title={taxRule.countryCode}
                            />
                            <span style={{marginLeft: 8}}>{taxRule.taxRuleName}</span>
                        </Box>
                        <span style={{fontSize: 12}}>({taxRule.grants.length} Grants)</span>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <ul style={{listStyle: "none", margin: 0, padding: 0}}>
                        {taxRule.grants.map((grant: string) => <li style={{paddingTop: 8, paddingBottom: 8}}>{grant}</li>)}
                    </ul>
                </AccordionDetails>
            </Accordion>
        })}
    </div>
}
