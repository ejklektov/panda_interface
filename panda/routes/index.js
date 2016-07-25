var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('panda',['user','document','incube', 'faq', 'inquire']);
var passport = require('passport')
var KakaoStrategy = require('passport-kakao').Strategy;

var expressSession = require('express-session');
var at=" ??????";

router.use(expressSession({
  secret: process.env.SESSION_SECRET||'secret',
  resave: false,
  saveUninitialized: false
}));

var passportHttp = require('passport-http');


router.use(passport.initialize());
router.use(passport.session());

passport.use(new passportHttp.BasicStrategy(verifyCrendentials));

function verifyCrendentials(username, password, done) {
  db.user.findOne({username:username},function (err, user) {
    if (err) { console.log(err); return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    console.log(user);
    return done(null, user);
  })
}
function tokensave(token) {
  at= token;
}
passport.serializeUser(function (user,done) {
  done(null,user)
});
passport.deserializeUser(function (id,done) {
  done(null,{id:id.name, name:id})
});

passport.use(new KakaoStrategy({
      clientID : 'df2591dce718bea4bdd968389332bef7',
      callbackURL : '/oauth'
    },
    function(accessToken, refreshToken, profile, done){
      // 사용자의 정보는 profile에 들어있다.
      tokensave(accessToken);
      at=accessToken;
      console.log('token is '+profile);
      console.log(profile);
      console.log(profile);
      db.user.findAndModify({
        query: { kakaoId: profile.id },
        update: {
          $setOnInsert: {
            username: profile.username,
            name: profile.id,
            roles : ['authenticated'],
            provider: 'kakao',
            kakao: profile._json,
            phone: profile.phone,
            email: profile.email
          }
        },
        new: true,   // return new doc if one is upserted
        upsert: true // insert the document if it does not exist
      }, function (err, user) {
        return done(err, user);
      });
    } 
));
router.get('/auth/kakao', passport.authenticate('kakao',{
  failureRedirect: '/login'
}));

router.get('/oauth', passport.authenticate('kakao', {
  failureRedirect: '/'
}),function (req, res) {
  res.redirect('/')
});

/* GET home page. */
// router.get('/',function (req, res) {
//   res.render('incube');
// })

router.get('/ho',function (req, res) {
  res.render('incbue_view/home')
})

router.get('/li',function (req, res) {
  res.render('incbue_view/list')
})

router.get('/',function (req, res) {
  res.render('main/index', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  })
});

router.get('/document',function (req, res) {
  db.document.find(function (err, docs) {
    res.json(docs);
  })
});
router.post('/document',function (req, res) {

});

router.get('/incubeInfo',function (req, res) {
  db.incube.findOne(function (err, doc) {
    // console.log(doc)
    res.json(doc)
  })
});

router.get('/kakao',function (req, res) {
  res.render('kakao')
});

router.get('/at',function (req, res) {
  console.log('???'+at)
  res.json(at)
});

router.get('/mypage',function(req,res){
  res.render('mypage/mypage', {
    title: 'incube',
    isAu: req.isAuthenticated(),
    user: req.user,
    token: req.token,
    phone: req.phone,
    email: req.email
    token: req.token,
    phone: req.phone,
    email: req.email,
    bank: req.bank,
    account: req.account,
    major: req.major
  })
});
router.get('/mypage_profile',function (req, res) {
  res.render('mypage/profile', {
    title: 'incube',
    isAu: req.isAuthenticated(),
    user: req.user,
    token: req.token
   })
});
router.get('/findUser', function(req,res) {
  db.user.findOne({
    name:req.user.id}
      ,function (err, doc) {
        console.log(doc);
        res.json(doc);
  })
})

router.put('/profile',function (req, res) {
  // console.log(req.body);
  // console.log(req.user.id);
  db.user.findAndModify({
    query:{name:req.user.id},
    update:
    {$set: {phone: req.body.phone, email: req.body.email, bank: req.body.bank, account: req.body.account, major: req.body.major}},new:true},function (err,doc) {
    res.json(doc);
    // console.log(doc);
  })
});

router.get('/edit_password',function(req,res){
  res.render('edit_password');
})

router.get('/edit_payment',function(req,res){
  res.render('edit_payment');
})

router.get('/sell_product_list',function(req,res){
  res.render('mypage/sell_product_list');
})

router.get('/buy_product_list',function(req,res){
  res.render('mypage/buy_product_list');
  // res.render('mypage', {
  //   title: 'incube',
  //   isAu:req.isAuthenticated(),
  //   user:req.user,
  //   token:req.token
  // })
});

router.get('/edit_profile',function(req,res){
  res.render('edit_profile', {
    title: 'incube',
        isAu:req.isAuthenticated(),
        user:req.user,
        token:req.token
  })
});

router.get('/edit_password',function(req,res){
  res.render('edit_password', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  })
})

router.get('/edit_payment',function(req,res){
  res.render('edit_payment', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  })
})


router.get('/home',function(req,res){
  res.render('home');
})


router.get('/index_feedback',function(req,res){
  res.render('index_feedback', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  });
})

router.get('/add_product',function(req,res){
  res.render('product/add_product');
})

router.get('/search',function(req,res){
  res.render('search');
})


router.get('/product_detail', function(req,res){
  res.render('product/product_detail', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  });
})

router.get('/introduce_us', function(req,res){
  res.render('system/introduce_us')
});

router.get('/product_show', function(req,res){
  res.render('product/product_show')
});

router.get('/datas',function (req, res) {
  db.user.find(function (err, docs) {
    // console.log(docs);
    res.json(docs);
  });
});

router.get('/logout',function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/product_item',function (req, res) {
  res.render('product/product_item',{
    title: 'panda',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  });
})

router.get('/product_item/:id', function (req, res) {
  var id = req.params.id;
  res.render('product/product_item', {
    title: 'panda',
    isAu:req.isAuthenticated(),
    user:req.user,
    id:id
  });
})
router.get('/product_item_info/:id',function (req, res) {
  db.Item.findOne({_id : mongojs.ObjectId(id)}, function(err, doc){
    if(err) {
      console.log(err)
    }
    res.json(doc);
  })
})

//help class
router.get('/help',function (req, res) {
  res.render('help/help',{
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  });
});

router.get('/FAQ',function (req, res) {
  res.render('help/FAQ');
});

router.get('/FAQ_get',function(req,res){
  db.faq.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  })
});

// router.get('/admin/modify_FAQ',function(req,res){
//   console.log(modifyFAQ);
//   // console.log('This is req');
//   // console.log(res);
//   // db.faq.findAndModify({
//   //   update:
//   //   {$set:{question: req.body.question, answer: req.body.answer}}, new:true},function(err,docs){
//   //   res.json(docs);
//   //   console.log(docs);
//   // })
// })

router.get('/inquire',function (req,res) {
  res.render('help/inquire');
});

router.get('/inquire_get',function (req,res) {
  // console.log(req.user.name.username);
  db.inquire.find({name:req.user.name.username}, function(err,docs){
    console.log(docs);
    res.json(docs);
  })
});

router.post('/inquire_regist',function (req,res) {
  var data = {"name":req.user.name.username, "type":req.body.inquireType, "inquire": req.body.inquireText, "answer" : null, "date":Date()}
  db.inquire.insert(data,function (err, docs) {
    // console.log(docs);
    res.json(docs);
  })


  // console.log(req);
  // db.inquire.insert({name:req.user.name.username, type:req.body.inquireType, inquire:req.body.inquireText, data:Date.noew()}, function(err,docs){
  //   console.log(docs);
  //   res.json(docs);
  // })
});

router.get('/request',function (req,res) {
  res.render('help/request');
});

router.get('/nav',function (req, res) {
  res.render('include/nav',{
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  })
});
router.get('/footer',function (req, res) {
  res.render('include/footer');
});

router.get('/app',function (req, res) {
  res.render('help/app');
});
router.get('/item_list',function (req, res) {
  res.render('item/item_list');
});
router.get('/item_pay',function (req, res) {
  res.render('item/item_pay',{
      isAu:req.isAuthenticated(),
      user:req.user
  });
});
router.get('/notice',function (req, res) {
  res.render('help/notice');
});
router.get('/tem',function (req, res) {
  res.render('tem');
});

router.get('/item_link',function (req, res) {
  console.log('at');
  console.log(at);
  res.render('item/item_link',{
    isAu:req.isAuthenticated(),
    user:req.user,
    istoken:at
  })
});
router.get('/token',function (req, res) {
  res.json(at);
});
var querystring = require('querystring');
router.get('/katlink',function (req, res) {
  console.log('ok');
  var http = require("https");

  var post_data = querystring.stringify({
    'template_id':'794'
  });
  var options = {
    host: 'kapi.kakao.com',
    // port: 80,
    path: '/v1/api/talk/memo/send',
    method: 'POST',
    // data: {},
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+at,
      'Content-Length': Buffer.byteLength(post_data)
    }

  };
  // http.request(options);
  var req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
// write data to request body
  req.write('{"string": "Hello, World"}');
  req.end();
});


module.exports = router;
