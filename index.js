const express = require('express');
const path = require('path');
const staticRoutes = require('./routes/staticRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.resolve('./public')));


// Static routes
app.use("/static", staticRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
