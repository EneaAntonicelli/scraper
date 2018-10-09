var express = require('express');
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/scrape", function(req, res) {
  
    axios.get("https://www.breitbart.com/").then(function(response) {
     
      var $ = cheerio.load(response.data);
  
      $("article h2").each(function(i, element) {
        
        var result = {};
  
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
  
        db.Article.create(result)
          .then(function(dbArticle) {
            
            console.log(dbArticle);
          })
          .catch(function(err) {
            
            return res.json(err);
          });
      });
  
      res.send("Scrape Complete");
    });
  });

router.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
router.get("*", (req,res) => {
    res.json("404 error page route");
});
module.exports = router;