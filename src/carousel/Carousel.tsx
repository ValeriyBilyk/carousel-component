import { Navigation } from "./Navigation";
import { List } from "./List";
import { useReducer } from "react";

export type Tax = {
    countryCode: number; // Example: 1, 2, 3...
    taxRuleName: string; // Example: "Rule A", "Rule B"...
}

export type Grant = {
    stakeholderName: string; // Example: "Aki Avni"
    taxRules: Tax[];
    available?: boolean
}

const grants: Array<Grant> = [
    {
        stakeholderName: "Aki Avni", // Example: "Aki Avni"
        taxRules: [
            {
                countryCode: 1, // Example: 1, 2, 3...
                taxRuleName: "Rule A", // Example: "Rule A", "Rule B"...
            },
            {
                countryCode: 2, // Example: 1, 2, 3...
                taxRuleName: "Rule B", // Example: "Rule A", "Rule B"...
            }
        ]
    },
    {
        stakeholderName: "Allan de Neergaard", // Example: "Aki Avni"
        taxRules: [
            {
                countryCode: 2, // Example: 1, 2, 3...
                taxRuleName: "Rule B", // Example: "Rule A", "Rule B"...
            }
        ]
    }
]

function transformGrantsToTaxRules(grants: Array<Grant>) {
    const taxRulesResult: any = {}

    grants.forEach((grant) => {
        grant.taxRules.forEach(taxRule => {
            if (!taxRulesResult[taxRule.taxRuleName]) {
                taxRulesResult[taxRule.taxRuleName] = {
                    ...taxRule,
                    checked: true,
                    grants: [grant.stakeholderName]
                }
            } else {
                taxRulesResult[taxRule.taxRuleName].grants.push(grant.stakeholderName)
            }
        })
    })

    return Object.values(taxRulesResult)
}

transformGrantsToTaxRules(grants)

export const CHANGE_TAX_RULE = "CHANGE_TAX_RULE"

function reducer(state: any, action: any) {
    switch (action.type) {
        case CHANGE_TAX_RULE:
            if (!action.checked) {
                const isLastTaxRuleChecked = state.transformedTaxRules.filter((transformedTaxRule: any) => transformedTaxRule.checked).length === 1
                if (isLastTaxRuleChecked) {
                    return state
                }
            }
            const transformedTaxRules = state.transformedTaxRules.map((transformedTaxRule: any) => {
                return transformedTaxRule.taxRuleName === action.taxRuleName ? {
                    ...transformedTaxRule,
                    checked: action.checked
                } : transformedTaxRule
            })
            return {
                ...state,
                grants: state.grants.map((grant: Grant) => {
                    const available = !!transformedTaxRules.filter((transformedTaxRule: any) =>
                        transformedTaxRule.checked && transformedTaxRule.grants.includes(grant.stakeholderName)).length
                    return {
                        ...grant,
                        available
                    }
                }),
                transformedTaxRules
            };
        default:
            return state;
    }
}

export const Carousel = () => {
    const [state, dispatch] = useReducer(reducer, {
        grants,
        selectedGrant: {
            grant: grants[0],
            orderValue: 1,
            commonAmount: grants.length
        },
        transformedTaxRules: transformGrantsToTaxRules(grants)
    })

    return <div>
        <Navigation state={state} dispatch={dispatch}/>
        <List state={state} dispatch={dispatch}/>
    </div>
}
