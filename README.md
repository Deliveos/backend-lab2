This is a simple Node.js application that uses the Nodemailer library to send emails.

### How to run
* Go to directory of the project
* Configure envitronment variables in `.env` file
* Run in command line the following command
```sh
npm install
node app.js
```

### How it works
The application uses `express` and `nodemailer`.
Application has enpoint at `/`, which accepts POST method with body:
```json
{
    "to": "",
    "subject": "",
    "text": ""
}
```

* "to" - "resepient email address"
* "subject" - "topic of the mail"
* "text" - "body of the mail"