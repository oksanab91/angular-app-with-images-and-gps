export class CurrencyQuake {
    pair: string;
    change: number;
}

export class CurrencyConverter {
    amount: number
    base_currency_code: string
    base_currency_name: string
    to_currency_code: string
    to_currency_name: string
    rate: number
    updated_date: string
}

export class ConverterFilter {
    from_currency_code: string
    to_currency_code: string    
    amount: number
    date: string
}

export class CurrConverterFilter extends ConverterFilter {
    dates: string[] = []
    displayCount: number
}

export interface ICurrConverterJson {
    amount: number
    base_currency_code: string
    base_currency_name: string
    rates: { [key: string]: {currency_name: string, rate: number, rate_for_amount: number} }
    status: string
    updated_date: string
}