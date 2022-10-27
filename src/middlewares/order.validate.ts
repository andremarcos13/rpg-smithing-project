import { NextFunction, Request, Response } from 'express';

export default class ValidateOrder {
  public validateOrderId = async (req: Request, res: Response, next: NextFunction) => {
    const productsId: [] = req.body.productsIds;

    if (!productsId) {
      return res.status(400).json(
        { message: '"productsIds" is required' },
      );
    }
    // https://stackoverflow.com/questions/767486/how-do-i-check-if-a-variable-is-an-array-in-javascript
    if (!Array.isArray(productsId)) {
      return res.status(422).json(
        { message: '"productsIds" must be an array' },
      );
    }
    if (!productsId.length) {
      return res.status(422).json(
        { message: '"productsIds" must include only numbers' },
      );
    }
    next();
  };
}