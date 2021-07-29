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

  // exports.checkJwt = jwt({
  //   secret: jwksRsa.expressJwtSecret({
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 10,
  //     jwksUri: 'https://dev-ie44sg37.eu.auth0.com/.well-known/jwks.json'
  //   }),
  //   audience: 'https://dev-ie44sg37.eu.auth0.com/api/v2/',
  //   issuer: 'https://dev-pxt8cafa.eu.auth0.com/',
  //   algorithms: ['RS256']
  // });
