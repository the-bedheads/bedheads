const generateVerificationCode = () => {
  const verification = Math.random().toString().slice(-6);
  console.log(verification);
  return verification;
};
module.exports = generateVerificationCode;
