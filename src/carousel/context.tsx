import { createContext, ReactNode, useContext, useReducer } from "react";
import { grants, transformGrantsToTaxRules } from "./data";
import { CarouselContextType, Grant, TransformedTaxRule } from "./types";

export const CHANGE_TAX_RULE = "CHANGE_TAX_RULE"
export const NAVIGATE = "NAVIGATE"

function reducer(state: any, action: any) {
    switch (action.type) {
        case CHANGE_TAX_RULE: {
            if (!action.checked) {
                const isLastTaxRuleChecked = state.transformedTaxRules.filter((transformedTaxRule: TransformedTaxRule) =>
                    transformedTaxRule.checked).length === 1
                if (isLastTaxRuleChecked) {
                    return state
                }
            }
            const transformedTaxRules = state.transformedTaxRules.map((transformedTaxRule: TransformedTaxRule) => {
                return transformedTaxRule.taxRuleName === action.taxRuleName ? {
                    ...transformedTaxRule,
                    checked: action.checked
                } : transformedTaxRule
            })
            const grants = state.grants.map((grant: Grant) => {
                const available = !!transformedTaxRules.filter((transformedTaxRule: TransformedTaxRule) =>
                    transformedTaxRule.checked && transformedTaxRule.grants.includes(grant.stakeholderName)).length
                return {
                    ...grant,
                    available
                }
            })
            const availableGrants = grants.filter((grant: Grant) => grant.available)
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
            const availableGrants = grants.filter((grant: Grant) => grant.available)
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

const initialState = {
    grants,
    selectedGrant: {
        grant: grants[0],
        orderValue: 0,
        commonAmount: grants.length,
        canNavigateBack: false,
        canNavigateForward: !!grants[1]
    },
    transformedTaxRules: transformGrantsToTaxRules(grants)
}

const CarouselContext = createContext<CarouselContextType>({
    state: initialState,
    dispatch: function () {},
});

type CarouselProviderProps = {
    children: ReactNode;
};
export function CarouselProvider({ children }: CarouselProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CarouselContext.Provider value={{ state, dispatch }}>
            {children}
        </CarouselContext.Provider>
    );
}

export function useCarouselContext() {
    return useContext(CarouselContext);
}
