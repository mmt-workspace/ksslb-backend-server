var crypto = require('crypto');
var base64url = require('base64url');

 const TokensGenerator = (size) =>{

     
     const Random1 = Math.floor(Math.random() * 2548)
     const Random2 = Math.floor(Math.random() * 5478) 
     const cryptoTokens = base64url(crypto.randomBytes(size))
     const  Tokens = Random1+ cryptoTokens + Random2

      return Tokens


        
}


module.exports = TokensGenerator