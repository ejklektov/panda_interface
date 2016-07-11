var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('panda',['user','document','incube']);
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

var allowCORS = function(req, res, next) {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  (req.method === 'OPTIONS') ?
      res.send(200) :
      next();
};

// 이 부분은 app.use(router) 전에 추가하도록 하자
router.use(allowCORS);
var CORS = require('cors')();

// 마찬가지로 app.use(router)전에 삽입한다
router.use(CORS);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
      callbackURL : 'http://localhost:3000/oauth'
    },
    function(accessToken, refreshToken, profile, done){
      // 사용자의 정보는 profile에 들어있다.
      tokensave(accessToken);
      at=accessToken;
      console.log('token is '+at);
      console.log(profile);
      db.user.findAndModify({
        query: { kakaoId: profile.id },
        update: {
          $setOnInsert: {
            username: profile.username,
            name: profile.id,
            roles : ['authenticated'],
            provider: 'kakao',
            kakao: profile._json
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
  res.render('index', {
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
  var data = {"title":req.body.title, "writer":req.user.name.username, "data":Date.now()}
  db.document.insert(data,function (err, doc) {
    res.json(doc);
  })
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
  res.render('mypage', {
    title: 'incube',
    isAu: req.isAuthenticated(),
    user: req.user,
    token: req.token
  })
})

router.get('/edit_profile',function(req,res){
  res.render('edit_profile');
})

router.get('/edit_password',function(req,res){
  res.render('edit_password');
})

router.get('/edit_payment',function(req,res){
  res.render('edit_payment');
})

router.get('/sell_product_list',function(req,res){
  res.render('sell_product_list');
})

router.get('/buy_product_list',function(req,res){
  res.render('buy_product_list');
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

router.get('/sell_product_list',function(req,res){
  res.render('sell_product_list', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  })
})

router.get('/buy_product_list',function(req,res){
  res.render('buy_product_list', {
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
  res.render('add_product');
})

router.get('/search',function(req,res){
  res.render('search');
})


router.get('/product_detail', function(req,res){
  res.render('product_detail', {
    title: 'incube',
    isAu:req.isAuthenticated(),
    user:req.user,
    token:req.token
  });
})

router.get('/introduce_us', function(req,res){
  res.render('introduce_us')
})


module.exports = router;
