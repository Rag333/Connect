const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <body>
                <h2>Hello 👋</h2>
                <p>${body}</p>
                <br/>
                <a href="https://connectwme.site">Login to ConnectwMe</a>
              </body>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "mahipal@connectwme.site", // MUST be verified in SES
  });
};

const run = async (toEmail, subject, body) => {
  try {
    const command = createSendEmailCommand(toEmail, subject, body);
    return await sesClient.send(command);
  } catch (err) {
    console.error("SES Error:", err.name, err.message);
    throw err;
  }
};

module.exports = { run };
