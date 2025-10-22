const express = require("express");
const ConnectionDb = require("./config/db");
const ProductModel = require("./Model/ProductSchema");
const cors = require("cors");


const app = express();


ConnectionDb();


app.use(cors());
app.use(express.json());


app.use('/api/product', require('./Routes/ProductRoutes'));
app.use( `/api/users`, require( `./Routes/UsersRoutes`));

const Port = 3000;




app.get("/", (req, res) => {
  res.send("Hello server");
});




app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
