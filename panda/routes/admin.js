var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');


var mongojs = require('mongojs');
var db    = mongojs('panda', ['user','Docu', 'Item', 'State', 'Feedback', 'Sell','faq', 'Buy', 'inquire', 'category', 'footer']);


var fs = require('fs');

router.get('/',function (req,res) {
  res.render('admin/index');
});

/* item area */
router.get('/item_regist', function (req,res) {
  res.render('admin/item/item_regist');
});

router.get('/item_check', function(req,res){
  res.render('admin/item/item_check');
})

router.get('/admin/item_get_all', function(req,res){
  db.Item.find(function(err,docs){
    // console.log(docs);
    res.json(docs);
  })
})

router.post('/admin/delete_item/:id', function(req,res){
  db.Item.remove({
        _id: mongojs.ObjectId(req.params.id)
      }
      , function (err, doc) {
        // console.log(doc);
        res.json(doc);
      });
})

router.get('/modify_item/:id', function (req, res) {
  // console.log(req.params.id);
  db.Item.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, doc) {
    // console.log(doc);
    res.json(doc);
  });
});

router.put('/send_item/:id', function(req,res){
  // console.log(req.body);
  db.Item.findAndModify({
    query:{_id: mongojs.ObjectId(req.params.id)},

    //picture: req.body.picture 추가 필요.
    update: {$set: {title: req.body.title, sell_type: req.body.sell_type, price: req.body.price, state: req.body.state, context: req.body.context, payment_state: req.body.payment_state}}, new: true
  }, function(err,doc){
    if(err){
      console.log(err);
    }
    res.json(doc);
  })
})

/* End item area */

router.get('/template', function (req, res) {
  res.render('admin/template');
});

router.get('/nav', function (req, res) {
  res.render('admin/nav');
});

/* FAQ area */
router.get('/FAQ_edit', function(req,res){
  res.render('admin/service_center/FAQ_edit');
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
        // console.log(doc);
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
    context : req.body.context,
    payment_state : null
    // picture : req.body.picture
  }, function (err, doc) {
    if(err) console.log(err);
    res.json(doc);
  });
});

/* End Get upload */

/* Inquire area */

router.get('/inquire_answer', function(req,res){
  res.render('admin/service_center/inquire_answer');
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

// 수정 후 확인 x
router.put('/delete_ans/:id', function(req,res){
  db.inquire.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, doc) {
    if (err)
      console.log(err);
  })
})

router.put('/send_ans/:id', function(req,res){
  // console.log(req.body.answer);
  
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

/* User area */

router.get('/user_check', function(req,res){
  res.render('admin/user/user_check');
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

router.post('/delete_user/:id', function(req,res){
  db.user.remove({
    _id: mongojs.ObjectId(req.params.id)
  },
  function(err){
    if(err){
      console.log(err);
    }
  })
})

/* End user area */


/* Category area */

router.get('/category_edit', function(req,res){
  res.render('admin/category/category_edit');
})

router.get('/category_get_all', function(req,res){
  db.category.find(function(err,docs){
    // if(err){
    //   console.log(err);
    // }
    // console.log('router_category_get_all');
    // console.log(docs);
    res.json(docs);
  })
})

router.get('/category_modify/:id', function(req,res){
  db.category.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, doc){
    res.json(doc);
  });  
})

router.put('/send_category/:id', function(req,res){
  // console.log(req.body);
  db.category.findAndModify({
    query:{_id: mongojs.ObjectId(req.params.id)},
    update: {$set: {group: req.body.group}}, new: true
  }, function(err,doc){
    if(err){
      console.log(err);
    }
    res.json(doc);
  })
})

router.post('/add_category', function(req,res) {
  db.category.insert({
    group: req.body.group
  }, function (err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc)
    }
  })
})

router.get('/delete_category/:id', function(req,res) {
  // console.log(req.params.id);
  db.category.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, doc) {
    if (err)
      console.log(err);
  })
})

/* End category area */

/* footer area */

router.get('/edit_footer', function(req,res){
  res.render('admin/footer/edit_footer');
})

router.get('/get_all_footer', function(req,res){
  db.footer.find(function(err,docs){
    // if(err){
    //   console.log(err);
    // }
    // console.log('router_category_get_all');
    // console.log(docs);
    res.json(docs);
  })
})

router.get('/modify_footer/:id', function(req,res){
  db.footer.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, doc){
    res.json(doc);
  });
})

router.put('/send_footer/:id', function(req,res){
  // console.log(req.body);
  db.footer.findAndModify({
    query:{_id: mongojs.ObjectId(req.params.id)},
    update: {$set: { }}, new: true
  }, function(err,doc){
    if(err){
      console.log(err);
    }
    res.json(doc);
  })
})

router.post('/add_footer', function(req,res) {
  db.footer.insert({
    // group: req.body.group
  }, function (err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc)
    }
  })
})

router.get('/delete_footer/:id', function(req,res) {
  // console.log(req.params.id);
  db.footer.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, doc) {
    if (err)
      console.log(err);
  })
})

/* End footer area */

module.exports = router;
