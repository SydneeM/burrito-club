# burrito-club
![burrito-club](https://github.com/user-attachments/assets/10546985-c1a7-4d63-bf90-bb3e9e395fd3)

burrito-club is a real-time chat application built with the socket.io library. Users can connect to a room to chat and plan their lunch outings. A weekly restaurant can be set, visited restaurants are saved, and weekly email reminders to pick a spot are sent out.

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`ATLAS_URI` MongoDB Atlas connection string

## Database Setup
MongoDB Atlas is used for the database. This project uses "burrito-db" for the database name, and it has collections "messages" and "restaurants."

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
