var express = require('express');
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
var fs = require("fs");

router.get("/scrape", function(req, res) {
  
    axios.get("https://www.breitbart.com/big-government/").then(function(response) {

     fs.writeFile("output.html",response.data, function(err){console.log(err)});
     
      var $ = cheerio.load(response.data);

      $(".article-list article").each(function(i, element) {
        
        var result = {};
  
        result.title = $(this)
          .children("a")
          .attr("title");
          
        result.link = $(this)
          .children("a")
          .attr("href");

        result.summary = $(this)
          .children("div")
          .children("div")
          .children("p")
          .text();

        // result.date = $(this)
        //   .children("div")
        //   .children("footer")
        //   .children("time")
        //   .attr("datetime");
          
        result.img = $(this)
          .children("a")
          .children("img")
          .attr("src");

        result.author = $(this)
          .children("div")
          .children("footer")
          .children("address")
          .attr("data-aname");

//NO DATABASE UP TO THIS POINT

        // console.log(result);
        // return;
// DATABASE STARTS HERE
        db.Article.insertMany(result)
        
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