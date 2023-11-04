// require
const app = require("./src/app");
require("dotenv").config();

// port
const port = process.env.PORT || 5000;

// server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
