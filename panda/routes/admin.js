var express = require('express');
var router = express.Router();



var mongojs = require('mongojs');
var db = mongojs('panda',['user','incube']);

router.get('/',function (req,res) {
  res.render('admin/index')
})

router.put('/incube/:id',function (req, res) {
  var id = req.params.id
  // console.log("id is : "+id)
  db.incube.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:{content:req.body.content}},new:true},function (err,doc) {
    if(err){
      console.log(err);
    }
    // console.log('doc is' + doc.content);
    res.json(doc);
  })
})

module.exports = router;
