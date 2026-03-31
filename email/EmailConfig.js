const EmailConfig = {
    host: '',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '',     
        pass: '', 
    },
    tls: {
        rejectUnauthorized: false, // optional, set to true in production
    },
};


module.exports = EmailConfig;