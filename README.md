# sleep_tracker<br>
#Sleep Tracker Web Application<br>
#Project Objective
<br>
The primary goal of this project is to help users monitor and improve their sleep patterns by giving them a simple, easy-to-use platform to:<br>
•	Record daily sleep and wake times<br>
•	Automatically calculate sleep duration<br>
•	View and manage past sleep logs<br>
•	Track consistency and spot patterns in their sleep habits<br>
This helps promote healthier sleeping behavior, increases self-awareness about sleep, and can be the first step toward improving mental and physical health.<br>
Why This App is Useful<br>
1. Promotes Healthy Sleep Habits<br>
Users become more aware of their sleep duration and timing. This can help fix:<br>
•	Irregular sleep schedules<br>
•	Insufficient sleep<br>
•	Late-night routines<br>
2. Improves Self-Tracking<br>
Instead of relying on memory or complicated tools, users get a simple log of when they slept and for how long.<br>
3. Easy to Use<br>
•	The UI is clean and minimal
•	Adding a sleep record takes less than a minute<br>
•	Built for quick daily use<br>
4. Helps Users Understand Patterns<br>
By logging data regularly, users can:<br>
•	Identify if they’re sleeping too little or too much<br>
•	See trends like sleeping later on weekends<br>
•	Realize the impact of lifestyle changes on their sleep
<br>

#How It Works – User Flow<br>
1.	Register<br>
o	User creates an account with a username and password<br>
o	Passwords are encrypted using bcrypt for security<br>
2.	Login<br>
o	User logs in and a session is created using express-session<br>
o	Session is stored in the backend so the user remains logged in<br>
3.	Add Sleep Entry<br>
o	User enters:<br>
	Date<br>
	Sleep time<br>
	Wake time<br>
o	App automatically calculates sleep duration in hours
4.	View Sleep Log<br>
o	List of past sleep entries displayed<br>
o	Shows duration for each night<br>
5.	Delete Entry<br>
o	User can delete entries they no longer want<br>
6.	(Optional Future Step) Visualize Stats<br>
o	User can see weekly/monthly averages, best sleep days, etc.<br>
Technical Highlights<br>
•	Frontend: Vue.js (SPA with routing using vue-router)<br>
•	Backend: Node.js + Express (RESTful API)<br>
•	Authentication: bcrypt + express- session<br>
•	Database: MongoDB (via Mongoose)<br>
•	Communication: Frontend talks to backend using axios and CORS settings<br>

<br>

#TECH STACK<br>
1. Backend Tech Stack<br>
🔸 Node.js<br>
A JavaScript runtime built on Chrome's V8 engine. It allows you to run JavaScript on the server.<br>
Used here for:<br>
•	Running the server (server.js)<br>
•	Defining API endpoints (/api/auth/*, /api/sleep/*)<br>
•	Connecting to MongoDB<br>
•	Handling sessions, routing, and middleware<br>
🔸 Express.js<br>
A lightweight Node.js framework for building web servers and REST APIs.<br>
Used here for:<br>
•	Creating backend API routes like login, register, add/get/delete sleep entries<br>
•	Defining middleware like requireAuth<br>
•	Parsing JSON (express.json())<br>
•	Managing sessions (express-session)<br>
🔸 MongoDB + Mongoose<br>
•	MongoDB is a NoSQL database, stores data in flexible JSON-like documents.<br>
•	Mongoose is an ODM (Object Data Modeling) library for MongoDB — it lets you define schemas and interact with the database more easily.<br>
Used here for:<br>
•	Defining User and SleepEntry schemas<br>
•	Performing operations like find, save, deleteOne on sleep entries or user accounts<br>
•	Storing persistent data about users and their sleep logs<br>
🔸 bcrypt<br>
A library to hash passwords securely.<br>
Used here for:<br>
•	Hashing passwords on register<br>
•	Comparing hashes on login<br>
🔸 express-session<br>
Middleware to manage user sessions on the server.<br>
Used here for:<br>
•	Creating sessions during login/register<br>
•	Validating session for protected routes<br>
🔸 cors<br>
Middleware for handling Cross-Origin Resource Sharing<br>
•	Lets your frontend (running on port 8080/8086) safely talk to backend (port 5000)<br>
•	Prevents CORS errors in browsers
<br>

#3. Frontend Tech Stack<br>
🔸 Vue.js<br>
A progressive JavaScript framework for building user interfaces.<br>
Used here for:<br>
•	Login, Register, Sleep Entry, and Statistics components<br>
•	Managing user input and API calls<br>
•	Displaying lists of sleep entries<br>
•	Handling routing via vue-router<br>
🔸 vue-router<br>
A routing library for Vue.js<br>
•	Manages page transitions without reloading<br>
•	Maps URLs to components<br>
🔸 axios<br>
What it is:<br>
A promise-based HTTP client for making API requests.<br>
Used here for:<br>
•	Sending login/register data to backend<br>
•	Fetching sleep data<br>
