const App = require("./App/App");
const connectDB = require("./src/DB/DB");

connectDB();

App.listen(3000, () => {
    console.log("Server running on port 3000.")
})