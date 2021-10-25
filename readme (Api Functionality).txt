Functionality :

Registering User:
1. Takes User Data To Create A User That Has to be verified through OTP.
2. send OTP/ resend OTP.
3. verify OTP.
4. Set Password. (Password is encrypted)
5. User Created and Confirmation Email Sent.

Login User:
1. User Logs In and a token is generated to verify the user on routes on which it is needed.

Updates For User:
1. User can select forget password and put in there email to get a link to reset their password.
2. User can change their PhoneNO Which will again be verified throungh OTP.

Books:
1. Get All Books. (Token Autherization Not Needed)  
2. Get One Book. (Token Autherization Needed, Which will be done by sending the token generated on Logging in in headers)  
3. Add One Books. (Token Autherization Needed, Which will be done by sending the token generated on Logging in in headers)    
4. Delete One Books. (Token Autherization Needed, Which will be done by sending the token generated on Logging in in headers)   
5. Update One Books. (Token Autherization Needed, Which will be done by sending the token generated on Logging in in headers)    


Note: Postman file is also exported in the Postman Folder to test the api.