import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: "medicalservices169@gmail.com",
        pass: "abthvacmadrhovvk",
    },
});

const MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Medical Services",
        link: 'https://mailgen.js/'
    }
})

export const sendMail = async (req, res) => {
    const {userEmail, text} = req.body;

    // body of the email
    const email = {
        body : {
            intro : text ||'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    const emailBody = MailGenerator.generate(email);

    const message = {
        from : process.env.EMAIL_HOST,
        to: userEmail,
        subject :"Reset password",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.send({ error }))

}
