e2e

## Sign up

### Google

### Signing in

- should sign them in
  - the user already exists in the system
  - the user has an invite that has been accepted
- should throw an error
  - if the user has not accepted an invite

### Signing up

- should allow them to proceed if there is no token (validation will be done when the user returns to the app)
- should throw the error page if a token is invalid
- should send an invite token to the sign in social endpoint in the sign up page
- it should throw if the token is invalid
- it should mark the token as used when they sign up

### Signing in after signing up with PW

- TBD
