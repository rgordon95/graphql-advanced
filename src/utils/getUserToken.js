import jwt from 'jsonwebtoken';

import { locales } from '../locales';
import Constants from '../Constants';

const getUserToken = ( userId ) => {

   return jwt.sign({ userId }, 'tempDevSecret', { expiresIn: Constants.Global.TOKEN_EXPIRATION });
}

export { getUserToken  as default }