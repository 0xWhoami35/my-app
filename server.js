const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Endpoint to read /etc/passwd
app.get('/read-passwd', (req, res) => {
  exec('cat /etc/passwd', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${err.message}`);
      return res.status(500).send('Internal Server Error');
    }

    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return res.status(500).send('Error Reading File');
    }

    // Respond with the contents of /etc/passwd
    res.type('text/plain');
    res.send(stdout);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
