const errorHandler = (err, req, res, next) => {
    consulte.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal', error: err.message });
};

module.exports = errorHandler;




// https:localhost:3000/api/v1/auth/login
// como generar el token de postman usando javaScrip