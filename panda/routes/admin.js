var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');


var mongojs = require('mongojs');
var db    = mongojs('panda', ['User','Docu', 'Item', 'State', 'Feedback', 'Sell','faq', 'Buy']);


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

router.get('/nav',function (req, res) {
  res.render('admin/nav');
});


router.get('/FAQ_edit',function(req,res){
  res.render('admin/FAQ_edit');
})

router.get('/modify_FAQ/:id',function (req, res) {
  // console.log(req.params.id);
  db.faq.findOne({
        _id: mongojs.ObjectId(req.params.id)
      }
      , function (err, doc) {
        console.log(doc);
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

router.put('/send_FAQ:id',function(req,res){
  var id = req.params.id;
  // id*=1;  //string to int
  console.log('================');
  console.log(req.body.question);
  console.log(req.body.answer);
  console.log(req.params.id);

  db.faq.findAndModify({
        query: {_id:mongojs.ObjectId(req.params.id)},
      update:{$set:{question:req.body.question, answer:req.body.answer}}, new:true}
      ,function(err, doc){
        if(err){
          console.log(err);
        }
        console.log('sddddd;dlfkjasd;lfkjasd;lfk');
        console.log(doc);
        res.json(doc);
    })
})

router.post('/add_FAQ',function(req,res){
  var data = {"question" : req.body.question, "answer" : req.body.answer}
  db.faq.insert(data,function(err, doc){
        if(err){
          console.log(err);
        }
        res.json(doc);
      })
})

/* GET upload. */
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

      //jpg로 올릴 경우를 고려해야함, Data.now()+part.filename으로 할 경우에 파일 이름때문에 서치를 못하는 문제가 생김
      filename = Date.now()+'.PNG';
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
    img_name : null
  }, function (err, doc) {
    if(err) console.log(err);
    console.log('OK_ json route.post./upload_product ?json : ' + doc)
    console.log(doc)
    res.json(doc);
  });
});


router.put('/item/upload_product_id/:id/:res',function (req, res) {
  var img_name = req.params.res;
  var id = req.params.id;
  console.log("OK_item insert id is : "+img_name)
  db.Item.findAndModify({
    query:{_id:mongojs.ObjectId(id)},
    update:{$set:{img_name:img_name}},
    new:true
  },function (err,doc) {
    if(err){      console.log(err);    }
    // console.log('doc is' + doc.content);
    res.json(doc);
  })
});
router.get('/item_list_data',function (req, res) {
  db.Item.find(function (err, doc) {
    res.json(doc);
  });
})

router.get('/item_list_main', function (req, res) {
  res.render('admin/item');
})

module.exports = router;
