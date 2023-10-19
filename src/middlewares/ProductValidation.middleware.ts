import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES, STATUS_CODES } from '../utils/errorsMessagesStatus';

const validateName = (name: string, res: Response) => {
  if (!name) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.NAME.REQUIRED });
  }

  if (typeof name !== 'string') {
    return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ message: ERROR_MESSAGES.NAME.TYPE });
  }

  if (name.length < 3) {
    return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ message: ERROR_MESSAGES.NAME.LENGTH });
  }
};

const validatePrice = (price: string, res: Response) => {
  if (!price) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.PRICE.REQUIRED });
  }

  if (typeof price !== 'string') {
    return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ message: ERROR_MESSAGES.PRICE.TYPE });
  }

  if (price.length < 3) {
    return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ message: ERROR_MESSAGES.PRICE.LENGTH });
  }
};

const ProductValidation = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  
  const nameError = validateName(name, res);
  if (nameError) return nameError;

  const priceError = validatePrice(price, res);
  if (priceError) return priceError;

  next();
};

export default ProductValidation;
