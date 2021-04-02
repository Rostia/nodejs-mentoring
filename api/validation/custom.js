const password = (value, helpers) => {
    if (!value.match(/\d/) || !value.match(/w/)) {
        return helpers.message('password should contain at letter and number');
    }

    return value;
};

export {
    password
};
