const express = require("express");

const router = express.Router();

// Dynamic Routes
router.get("/:fileName?", (req, res) => {
    // Render the specific file if fileName is provided, otherwise render the default file (e.g., "index").
    const fileName = req.params.fileName;
    
    if (fileName) {
        res.render(fileName, { title: fileName });
    } else {
        res.render('index', { title: 'Home' });
    }
});

module.exports = router;
