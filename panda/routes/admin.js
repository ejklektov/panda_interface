var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');


var mongojs = require('mongojs');
var db = mongojs('panda',['user','incube']);

var fs = require('fs');

router.get('/',function (req,res) {
  res.render('admin/index')
});

router.get('/item_regist',function (req,res) {
  res.render('admin/item_regist')
});

router.put('/incube/:id',function (req, res) {
  var id = req.params.id;
  console.log("id is : "+id)
  db.incube.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:{content:req.body.content}},new:true},function (err,doc) {
    if(err){
      console.log(err);
    }
    // console.log('doc is' + doc.content);
    res.json(doc);
  })
});

router.get('/template',function (req, res) {
  res.render('admin/template');
});

/* GET upload. */
router.post('/', function(req, res, next) {
  var form = new multiparty.Form();

  // get field name & value
  form.on('field',function(name,value){
    console.log('normal field / name = '+name+' , value = '+value);
  });

  console.log('ok');

  // file upload handling
  form.on('part',function(part){
    var filename;
    var size;
    if (part.filename) {
      filename = part.filename;
      size = part.byteCount;
    }else{
      part.resume();

    }

    // console.log("Write Streaming file :"+filename);
    var writeStream = fs.createWriteStream('./tmp/'+filename);
    writeStream.filename = filename;
    part.pipe(writeStream);

    part.on('data',function(chunk){
      console.log(filename+' read '+chunk.length + 'bytes');
    });

    part.on('end',function(){
      console.log(filename+' Part read complete');
      writeStream.end();
    });
  });

  // all uploads are completed
  form.on('close',function(){
    res.status(200).send('Upload complete');
  });

  // track progress
  form.on('progress',function(byteRead,byteExpected){
    console.log(' Reading total  '+byteRead+'/'+byteExpected);
  });

  form.parse(req);

});

module.exports = router;
