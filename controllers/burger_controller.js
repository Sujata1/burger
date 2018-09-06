var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js")

router.get("/", function (req, res) {
  burger.all(function (data) {
    var burgerObject = {
      burgers: data
    };
    res.render("index", burgerObject);
  });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne(
    {
      devoured: req.body.devoured
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.post("/api/burgers", function (req, res) {
  burger.create(["burger_name"], [req.body.burger_name], function (result) {
    res.json({ id: result.insertId });
  });
});

router.delete("/api/burgers", function (req, res) {
  burger.deleteAll(function (result) {
    res.end();
  });
});

module.exports = router;
