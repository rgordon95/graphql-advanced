import bcrypt from 'bcryptjs';

import Constants from '../Constants';
import { locales } from '../locales';


const getHashedPassword = (password) => {

    if (password.length < Constants.PasswordRequirements.TOO_SHORT) {
        throw new Error(locales.errors.passwordTooShort)
    }

    if (password.length > Constants.PasswordRequirements.TOO_LONG ) {
        throw new Error(locales.errors.passwordTooLong)
    }

    return bcrypt.hash(password, 16)


}

export { getHashedPassword as default }