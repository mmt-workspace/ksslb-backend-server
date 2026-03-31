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
/*  host: "smtp.hmailplus.com",
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: "admin@mmt-ng.com",
        pass: "36366360mmT@@", // use actual password
      },
      tls: {
        rejectUnauthorized: false, // optional
      }, */


module.exports = EmailConfig;