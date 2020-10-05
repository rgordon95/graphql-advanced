import jwt from 'jsonwebtoken';

import { locales } from '../locales';

const getUserId = ( request ) => {
    const header = request.request.headers.authorization

    if (!header) {
        throw new Error(locales.errors.authenticationRequired)
    }

    const token = header.replace('Bearer ', '')

    const decoded =  jwt.verify(token, 'tempDevSecret');

    return decoded.userId
}

export { getUserId  as default }