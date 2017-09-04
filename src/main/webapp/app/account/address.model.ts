
export const STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'DE', 'CT', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
    'WI', 'WY'
];

export class Address {
    constructor(public address?: string, public country?: string, public state?: string, public city?: string,
                public postalCode?: string) {
    }
}
