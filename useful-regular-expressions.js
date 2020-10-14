/* 
 * Email validation:
 */
 const emailValidation = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
 
 /* 
  * Strong password: 
  * At least 8 chars
  * At least one uppercase letter
  * At least one lowercase letter
  * At least one number
  * At least one special char
  */
  const strongPassword = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  
