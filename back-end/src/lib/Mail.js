import nodemailer from 'nodemailer';
import path from 'path';
import expshbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  async sendmail(message) {
    try {
      await this.transport.sendMail({
        ...mailConfig.default,
        ...message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  configureTemplates() {
    const viewPath = path.resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transport.use(
      'compile',
      nodemailerhbs({
        viewEngine: expshbs.create({
          layoutsDir: path.resolve(viewPath, 'layouts'),
          partialsDir: path.resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }
}

export default new Mail();
