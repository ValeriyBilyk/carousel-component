import { Dispatch } from "react";

export type CarouselContextType = {
    state: any;
    dispatch: Dispatch<any>;
};

export type Tax = {
    countryCode: string;
    taxRuleName: string;
}

export type TransformedTaxRule = Tax & {
    grants: string[];
    checked: boolean;
}

export type Grant = {
    stakeholderName: string;
    taxRules: Tax[];
    available?: boolean
}
