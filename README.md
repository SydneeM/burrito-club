# Burrito Club
Burrito Club is a real-time chat application built with the socket.io library. Users can connect to a room to chat and plan their lunch outings. A weekly restaurant can be set, visited restaurants are saved, and weekly email reminders to pick a spot are sent out.

![burrito-club](https://github.com/user-attachments/assets/10546985-c1a7-4d63-bf90-bb3e9e395fd3)

## Environment Variables
To run this project, you will need to add the following environment variables to your server/.env file

`ATLAS_URI` MongoDB Atlas connection string

`GMAIL_NAME` Gmail address to send emails from

`GMAIL_PASSWORD` Gmail application specific password

`EMAIL_LIST` Emails to send notifications to


You will need a MongoDB Atlas account and an email account (currently using gmail, but this can be changed to anything that https://nodemailer.com/ supports).

## Database Setup
MongoDB Atlas is used for the database. This project uses "burrito-db" for the database name, and it has collections "messages" and "restaurants."

## Notification Setup
Reminder emails are sent using nodemailer on a cron job. To configure the timing and email settings, you can adjust the cron schedule and nodemailer object in server/index.js.

## Run Locally
Go to the server directory

```bash
cd server
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

Go to the client directory

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start the client

```bash
npm run dev
```
