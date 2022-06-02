import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as request from 'request';

export default (req: VercelRequest, res: VercelResponse) => {
    request({ uri: 'https://api.hgbrasil.com/weather??woeid=449648' }).pipe(res);
};