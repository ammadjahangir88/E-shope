require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors())

app.use(express.json());


app.get("/",(req,resp)=>{
    resp.send("Welcome to eShop Websit")
})

// const calculateOrderAmount = (items) => {

//   return 1400;
// };


const PORT = 4242
app.listen(PORT, () => console.log("Node server listening on port 4242!"));
