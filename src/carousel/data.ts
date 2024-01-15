import { Grant, TransformedTaxRule } from "./types";

export const grants: Array<Grant> = [
    {
        stakeholderName: "Aki Avni",
        available: true,
        taxRules: [
            {
                countryCode: "US",
                taxRuleName: "Rule A",
            },
            {
                countryCode: "IL",
                taxRuleName: "Rule B",
            }
        ]
    },
    {
        stakeholderName: "Allan de Neergaard",
        available: true,
        taxRules: [
            {
                countryCode: "IL",
                taxRuleName: "Rule B",
            }
        ]
    }
]

export function transformGrantsToTaxRules(grants: Array<Grant>): TransformedTaxRule[] {
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
