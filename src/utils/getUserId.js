import jwt from 'jsonwebtoken';

import { locales } from '../locales';

const getUserId = ( request, requireAuth = true ) => {
    const header = request.request.headers.authorization

    if (header) {
         const token = header.replace('Bearer ', '')
         const decoded =  jwt.verify(token, 'tempDevSecret');
         return decoded.userId 
    }

 if (requireAuth) {
    throw new Error(locales.errors.authenticationRequired)
 }

 return null;
}

export { getUserId  as default }