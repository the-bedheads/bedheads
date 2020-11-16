const generateVerificationCode = () => {
  const verification = Math.random().toString().slice(-6);
  return verification;
};
module.exports = generateVerificationCode;
