export const rpName: string = 'Kalkulator Lingkaran Passkey';

export const rpID: string = process.env.RP_ID || 'localhost';

const port = process.env.PORT || 8080;
export const origin: string = `http://${rpID}:${port}`;