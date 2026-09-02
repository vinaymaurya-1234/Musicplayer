const App = require("./App/App");
const connectDB = require("./src/DB/DB");

connectDB();

const PORT = process.env.PORT || 10000;

App.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});