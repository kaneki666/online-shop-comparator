const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url1 = "https://www.daraz.com.bd/catalog/?q=";
const url2 = "https://cellbazaar.com/search/pattern,";

function searchProducts(searchTerm) {
    return fetch(`${url1}${searchTerm}`)
        .then(response => response.text())
    }
    searchProducts('oneplus')
        .then(body => {
            const products = [];
            const $ = cheerio.load(body);
            $(".c16H9d").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $location = "No Location";
                const $price = $element.find(".price");
                const $link = $element.find("a");
                const $image = $element.find(".img-responsive");
                console.log($element.text())
           

                // const product = {
                //     title: $title.attr('title'),
                //     location: $location(),
                //     price: $price.text(),
                //     link: $link.attr("href"),
                //     image: $image.attr("src")
                // };
                // products.push(product);
            });

           
        });
  
