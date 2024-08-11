const { validationResult, check } = require('express-validator');

exports.validate = (fields) => {
    return [
        ...fields.map((field) => {
            if (field === 'password') {
                return check(field)
                    .notEmpty().withMessage('Password is a mandatory field')
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@#$%^&+=*!-]{8,}$/, "i")
                    .withMessage('Password must be at least 8 characters long, contain a number, an uppercase letter, and a lowercase letter');
            }            
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return check(`${parent}.${child}`).notEmpty().withMessage(`${child} in ${parent} is a mandatory field`);
            }
            return check(field).notEmpty().withMessage(`${field} is a mandatory field`);
        }),
        (req, res, next) => {
            // console.log(req.fields);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        }
    ];
};