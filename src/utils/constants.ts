export const rpName: string = 'Kalkulator Lingkaran Passkey';

export const rpID: string = process.env.RP_ID || 'localhost';

const isNgrok = rpID.includes('ngrok');
const port = process.env.PORT || 8080;

export const origin: string = isNgrok 
    ? `https://${rpID}` 
    : `http://${rpID}:${port}`;