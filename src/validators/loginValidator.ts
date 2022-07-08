import { checkSchema } from 'express-validator';
import errorMessage from '../constants/constants';

const loginValidator = checkSchema({
  email: {
    isEmail: {
      bail: true,
    },
    normalizeEmail: {
      options: {
        all_lowercase: false,
      },
    },
  },
  password: {
    errorMessage: errorMessage.LoginValidationConstants.password,
    isString: {
      negated: false,
      bail: true,
    },
    exists: {
      options: {
        checkNull: true,
        checkFalsy: true,
      },
    },
    notEmpty: {
      errorMessage: errorMessage.LoginValidationConstants.passwordNotEmpty,
    },
  },
});

export default loginValidator;