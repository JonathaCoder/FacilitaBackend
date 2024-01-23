const express = require("express");
const cors = require("cors");
const allRoutes = require("./routes/allRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(allRoutes);

function teste(request, response) {
  return response.json("Run");
}
app.get("/fffff", teste);

app.get("/health", (req, res) => {
  return res.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));
