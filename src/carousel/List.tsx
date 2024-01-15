import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChangeEvent } from "react";
import ReactCountryFlag from "react-country-flag";
import { CHANGE_TAX_RULE, useCarouselContext } from "./context";
import { TransformedTaxRule } from "./types";

export const List = () => {
    const { state, dispatch} = useCarouselContext()
    const allChecked = state.transformedTaxRules.filter((taxRule: TransformedTaxRule) =>
        taxRule.checked).length === state.transformedTaxRules.length

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, taxRuleName: string) => {
        dispatch({ type: CHANGE_TAX_RULE, taxRuleName, checked: event.target.checked })
    }

    return <div style={{width: 400}}>
        <Accordion style={{marginBottom: 0}}>
            <AccordionSummary>
                <Box sx={{display: "flex", alignItems: "center", fontWeight: "600"}}>
                    <Checkbox
                        checked={allChecked}
                        indeterminate={!allChecked}
                    />
                    All Award Letters
                </Box>
            </AccordionSummary>
        </Accordion>
        {state.transformedTaxRules.map((taxRule: TransformedTaxRule) => {
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
