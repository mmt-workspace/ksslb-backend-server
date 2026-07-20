const EmailConfig = {
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'srv474867.hstgr.cloud@tienssg.com',     
        pass: 'Server@spider2026', 
    },
    tls: {
        rejectUnauthorized: false, // optional, set to true in production
    },
};


module.exports = EmailConfig;