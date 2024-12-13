const generatedOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6 digit random number
};

//export default generatedOtp;
export default generatedOtp;