var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');


var mongojs = require('mongojs');
var db    = mongojs('panda', ['user','Docu', 'Item', 'State', 'Feedback', 'Sell','faq', 'Buy', 'inquire']);


var fs = require('fs');

router.get('/',function (req,res) {
  res.render('admin/index');
});

router.get('/item_regist',function (req,res) {
  res.render('admin/item_regist');
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

router.get('/template', function (req, res) {
  res.render('admin/template');
});

router.get('/nav', function (req, res) {
  res.render('admin/nav');
});

/* FAQ area */
router.get('/FAQ_edit', function(req,res){
  res.render('admin/FAQ_edit');
})

router.get('/modify_FAQ/:id', function (req, res) {
  // console.log(req.params.id);
  db.faq.findOne({
        _id: mongojs.ObjectId(req.params.id)
      }, function (err, doc) {
        // console.log(doc);
        res.json(doc);
      });
});

router.get('/delete_FAQ/:id',function (req, res) {
  // console.log(req.params.id);
  db.faq.remove({
        _id: mongojs.ObjectId(req.params.id)
      }
      , function (err, doc) {
        console.log(doc);
        res.json(doc);
      });
});

router.put('/send_FAQ:id', function(req,res){
  var id = req.params.id;
  // console.log(req.body.question);
  // console.log(req.body.answer);
  // console.log(req.params.id);
  db.faq.findAndModify({
        query: {_id:mongojs.ObjectId(req.params.id)},
      update:{$set:{question:req.body.question, answer:req.body.answer}}, new:true}
      ,function(err, doc){
        if(err){
          console.log(err);
        }
        // console.log(doc);
        res.json(doc);
    })
})

router.post('/add_FAQ', function(req,res){
  var data = {"question" : req.body.question, "answer" : req.body.answer}
  db.faq.insert(data,function(err, doc){
        if(err){
          console.log(err);
        }
        res.json(doc);
      })
})

/* End FAQ area */

/* GET upload */
router.post('/', function(req, res, next) {
  var form = new multiparty.Form();

  // get field name & value
  form.on('field',function(name,type){
    console.log('normal field / name = '+name+' , value = '+type);
  });

  console.log('OK_ post /');
  var filename;
  // file upload handling
  form.on('part',function(part){

    var size;
    if (part.filename) {
      console.log(part);
      filename = Date.now()+part.filename;
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
    // res.status(200).send('Upload complete');
    res.json(filename);
  });

  // track progress
  form.on('progress',function(byteRead,byteExpected){
    console.log(' Reading total  '+byteRead+'/'+byteExpected);
  });

  form.parse(req);

});

router.post('/upload_product', function(req,res){
  db.Item.insert({
    title : req.body.title,
    price : req.body.price,
    sell_type : req.body.type,
    state : req.body.state,
    context : req.body.context
  }, function (err, doc) {
    if(err) console.log(err);
    res.json(doc);


  });
});

/* End Get upload */

/* Inquire area */

router.get('/inquire_answer', function(req,res){
  res.render('admin/inquire_answer');
})

router.get('/inquire_get_all', function(req,res){
  db.inquire.find(function(err,docs){
    // console.log(docs);
    res.json(docs);
  })
})

router.get('/inquire_ans/:id', function(req,res){
  db.inquire.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, doc){
    res.json(doc);
  });
})

router.put('/delete_ans/:id', function(req,res){
  db.inquire.findAndModify({
    query:{_id: mongojs.ObjectId(req.params.id)},
    update: {$set: {answer: null}}, new: true
  }, function(err,doc){
    if(err){
      console.log(err);
    }
      res.json(doc)
  })
})

router.put('/send_ans/:id', function(req,res){
  console.log(req.body.answer);
  
  db.inquire.findAndModify({
    query:{_id: mongojs.ObjectId(req.params.id)},
    update: {$set: {answer: req.body.answer}}, new: true
  }, function(err,doc){
    if(err){
      console.log(err);
    }
    res.json(doc)
  })
})

/* End inquire area */

/* User check area */

router.get('/user_check', function(req,res){
  res.render('admin/user_check');
})

router.get('/user_get_all', function(req,res){
  db.user.find(function(err,docs){
    if(err){
      console.log(err);
    }
    console.log('router_user_get_all');
    console.log(docs);
    res.json(docs);
  })
})

/* End user check area */


module.exports = router;
