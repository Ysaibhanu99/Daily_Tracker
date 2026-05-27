# Daily Tracker App 📅

Hey! Welcome to my Daily Tracker project. I built this app to help keep my days organized and track my habits, schedule, and daily priorities. 

## What does it do?
It's a web-based daily planner that works offline (like a real app) but also seamlessly syncs to a database in the cloud! 

Some cool features I implemented:
- **Customizable Templates:** You can drag and drop different planner widgets (like an Hourly Schedule, Habits Tracker, Priorities, etc.) and resize them to make your own perfect layout.
- **Offline First:** It saves everything to your browser's local storage immediately, so it's super fast and works without internet.
- **Cloud Sync:** I built a backend server that automatically syncs the data to a PostgreSQL database in the background whenever you're online.
- **PWA Support:** It can be installed directly to your home screen or desktop!

## How I built it (Tech Stack) 🛠️
- **Frontend:** Pure HTML, CSS (using Flexbox for the fluid layouts), and Vanilla JavaScript. I wanted to keep it super lightweight without heavy frameworks.
- **Backend:** Node.js with Express for the API server.
- **Database:** PostgreSQL (hosted on Neon DB) to store all the planner data using `JSONB`.

## How to run it locally

If you want to run this project on your own machine, follow these steps:

1. **Clone the repo**
   ```bash
   git clone https://github.com/Ysaibhanu99/Daily_Tracker.git
   cd Daily_Tracker
   ```

2. **Start the Backend Server**
   Navigate to the backend folder and install the packages:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder and add your Postgres connection URL:
   ```env
   DATABASE_URL=postgresql://your_db_url_here?sslmode=verify-full
   PORT=3000
   ```
   Then start the server!
   ```bash
   node server.js
   ```

3. **Open the Frontend**
   Just double-click and open the `daily_planner_app.html` file in any web browser! No front-end build steps required.

## Things I learned
Building this was a really fun challenge. Moving from CSS Grid to Flexbox to make the widgets freely resizable taught me a lot about responsive design, and figuring out how to silently sync local browser storage data with a live remote Postgres database using Node.js was a fantastic full-stack learning experience!
