import jwt from 'jsonwebtoken';

import { locales } from '../locales';
import Constants from '../Constants';

const getUserToken = ( userId ) => {

   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: Constants.Global.TOKEN_EXPIRATION });
}

export { getUserToken  as default }