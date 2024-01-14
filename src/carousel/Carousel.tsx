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
        available: true,
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
        available: true,
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
export const NAVIGATE = "NAVIGATE"

function reducer(state: any, action: any) {
    switch (action.type) {
        case CHANGE_TAX_RULE: {
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
            const grants = state.grants.map((grant: Grant) => {
                const available = !!transformedTaxRules.filter((transformedTaxRule: any) =>
                    transformedTaxRule.checked && transformedTaxRule.grants.includes(grant.stakeholderName)).length
                return {
                    ...grant,
                    available
                }
            })
            const availableGrants = grants.filter((grant: any) => grant.available)
            const selectedGrant = {
                grant: availableGrants[0],
                orderValue: 0,
                commonAmount: availableGrants.length,
                canNavigateBack: false,
                canNavigateForward: !!availableGrants[1]
            }
            return {
                ...state,
                selectedGrant,
                grants,
                transformedTaxRules
            };
        }
        case NAVIGATE:
            const availableGrants = grants.filter((grant: any) => grant.available)
            const grantIndex = action.direction === "forward" ? state.selectedGrant.orderValue + 1 : state.selectedGrant.orderValue - 1
            const selectedGrant = {
                grant: availableGrants[grantIndex],
                orderValue: grantIndex,
                commonAmount: availableGrants.length,
                canNavigateBack: !!availableGrants[grantIndex - 1],
                canNavigateForward: !!availableGrants[grantIndex + 1]
            }
            return {
                ...state,
                selectedGrant
            }
        default:
            return state;
    }
}

export const Carousel = () => {
    const [state, dispatch] = useReducer(reducer, {
        grants,
        selectedGrant: {
            grant: grants[0],
            orderValue: 0,
            commonAmount: grants.length,
            canNavigateBack: false,
            canNavigateForward: !!grants[1]
        },
        transformedTaxRules: transformGrantsToTaxRules(grants)
    })

    return <div>
        <Navigation state={state} dispatch={dispatch}/>
        <List state={state} dispatch={dispatch}/>
    </div>
}
