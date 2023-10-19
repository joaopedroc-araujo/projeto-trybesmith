const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const ERROR_MESSAGES = {
  NAME: {
    REQUIRED: '"name" is required',
    TYPE: '"name" must be a string',
    LENGTH: '"name" length must be at least 3 characters long',
  },
  PRICE: {
    REQUIRED: '"price" is required',
    TYPE: '"price" must be a string',
    LENGTH: '"price" length must be at least 3 characters long',
  },
};

export { STATUS_CODES, ERROR_MESSAGES };
