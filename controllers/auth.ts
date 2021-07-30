import { Request, Response,  NextFunction} from "express"
const config = require('../config');
var jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJWT = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-ie44sg37.eu.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://dev-ie44sg37.eu.auth0.com/api/v2/',
    issuer: 'https://dev-ie44sg37.eu.auth0.com/',
    algorithms: [ 'RS256' ]
  })

exports.checkRole = (role:string) => (req:any, res:Response, next:NextFunction) => {
  const user = req.user;

  if (user && user[config.AUTH0_NAMESPACE+'/roles'].includes(role)){
    next()
  }
  else{
    return res.status(401).send("You are not authorized to access this resource")
  }
}
