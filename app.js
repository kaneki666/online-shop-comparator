const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const exphbs = require("express-handlebars");
const path = require("path")

const scraper = require("./scraper/scraper");


const app = express();


app.use(express.static(`${__dirname}/public`));

// handlebars
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Middleware
app.use(bodyParser.json());
app.use(cors());
//Routes
app.get('/', (req, res) => res.render('allproduct'));


app.get("/search", async (req, res) => {
	const { query } = req.query;
    const cellBazarProducts = await scraper.searchProducts1(query);
    const bikroyDotComProducts = await scraper.searchProducts2(query);
    const pickabooProducts = await scraper.searchProducts3(query);
    // const amazonProducts = await scraper.searchProducts4(query);
    const allProducts = [...cellBazarProducts, ...pickabooProducts, ...bikroyDotComProducts];
    res.render('allproduct',{allProducts});
});


app.get("/search/:title", async(req, res) => {
    const { title } = req.params;
    const cellBazarProducts = await scraper.searchProducts1(title);
    const bikroyDotComProducts = await scraper.searchProducts2(title);
    const pickabooProducts = await scraper.searchProducts3(title);
    // const amazonProducts = await scraper.searchProducts4(title);
    const allProducts = [...cellBazarProducts, ...pickabooProducts, ...bikroyDotComProducts];
    res.render('allproduct',{allProducts});
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));