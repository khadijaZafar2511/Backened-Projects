import { validationResult, body } from "express-validator";

export const  validation = [
    body("users").isMongoId().withMessage("Invalid Id Format"),
    body("items.*.products").isMongoId().withMessage("Ivalid Id Format"),
    body("items.*.quantity").isInt({min:1,max:5}).withMessage("Quantity must be atleast 1 or max 5 "),


 (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({error:errors.array()})
    }
    next();
}
]

