const forgotPasswordTemplate = ({name,otp}) => {
  return `
    <div>
    <p> Dear ${name}</p>
    <p> You requested for a password reset, kindly use the OTP below to reset your password</p>
    <div style="background:yellow;font-size:20px;padding:20px; text-align:center; font-weight :800;">
      ${otp}
    </div>
    <p>This otp is valid for only 1 hour . Enter this otp in the ZipMart website to reset your password</p>
    <br/>
    <br/>
    <p>Thanks</p>
    <p>ZipMart</p>

    </div>
  `
};
export default forgotPasswordTemplate;