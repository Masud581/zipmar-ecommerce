const verifyEmailTemplate = ({name, url}) => {

    return`
    <p>Hi ${name}</p>
    <p>Thank you for registering ZipMart</p>
    <a href=${url} style ="background: yellow; margin-top :20px; padding: 20px;">
      verify your Email
    </a>
    `
}

export default verifyEmailTemplate;