exports.getFieldsToValidate = (api) => {
    switch (api) {
        case '/register':
            return [
                'firstName', 'lastName', 'email', 'address', 'imageUrl', 'password'
            ];
        case '/login':
            return [
               'email','password'
            ];
        case '/verify':
            return [
                'email', 'otp'
            ];
        default:
            return [];
    }
};