
var express = require('express');
var path = require('path');
const { nextTick } = require('process');
var app = express();
var fs=require('fs');
var session=require('express-session');



const { Console } = require('console');
const { TooManyRequests } = require('http-errors');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const { maxHeaderSize } = require('http');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:true
}));



    //Get Request For main Page
    app.get('/',function(req,res){
      res.render('Login',{error:""});
    });
     
    //Post Request for login Main Page
    //checks for credentials using the function check_credentials
      app.post('/',function(req,res){
      var x=req.body.username;
      var y=req.body.password;
      if(x==''||y==''){
        console.log("Empty Textbox");
        res.render('login',{error:"Please enter information"});
      }
      else{
        var user=check_credentials(x,y)
      if(user[0]==0){
        console.log("User does not exist");
        res.render('login',{error:"User does not exist"});
      }
      else if(user[0]==1){
        console.log("username and passwords match");
        req.session.user=user[1];
        req.session.save();
        res.render('home');
      }
      else if(user[0]==2){
        console.log("incorrect password");
        res.render('login',{error:"incorrect password"});
      }
      else if(user[0]==3){
        console.log("username not registered");
        res.render('login',{error:"username not registered"});
      }


      }});


      //Post Method add Dunes to want to read List
      app.post("/addDunes",function(req,res){
        if(req.session.user===null){
          res.redirect('/');
        }
        else{
        for(i in req.session.user.toreadlist ){
          if(req.session.user.toreadlist[i].name==='dune'){
            res.render('dune',{error:"Already on your to read list"});
            return;
          }
        }
        
        var users=getUsers();
        for(i in users){
          if(users[i].username===req.session.user.username){
            users[i].toreadlist.push({name:'dune',link:'./dune.jpg',href:'/dune'});
            req.session.user=users[i];
            
          }
         
        }
        addUsers(users);
        res.render('dune',{error:"Added Successfuly"});
      }
      })
      
      //Post Method add Flies to want to read list
      app.post("/addFlies",function(req,res){
        if(req.session.user===null){
          res.redirect('/');
        }
        else{
        for(i in req.session.user.toreadlist ){
          if(req.session.user.toreadlist[i].name==='flies'){
            res.render('flies',{error:"Already on your to read list"});
            return;
          }
          
        }
        
        var users=getUsers();
        for(i in users){
          if(users[i].username===req.session.user.username){
            users[i].toreadlist.push({name:'flies',link:'./flies.jpg',href:'/flies'});
            req.session.user=users[i];
          }

        }
        addUsers(users);
        res.render('flies',{error:"Added Successfuly"});
      }
      })

      //Post method add grapes to want to read list
      app.post("/addGrapes",function(req,res){
        if(req.session.user===null){
          res.redirect('/');
        }
        else{
        for(i in req.session.user.toreadlist ){
          if(req.session.user.toreadlist[i].name==='grapes'){
            res.render('grapes',{error:"Already on your to read list"});
            return;
          }
        }
        
        var users=getUsers();
        for(i in users){
          if(users[i].username===req.session.user.username){
            users[i].toreadlist.push({name:'grapes',link:'./grapes.jpg',href:'/grapes'});
            req.session.user=users[i];
            
          }
        }
        addUsers(users);
        res.render('grapes',{error:"Added Successfuly"});
      }
      })

      //Post method add leaves to want to read list
      app.post("/addLeaves",function(req,res){
        if(req.session.user===null){
          res.redirect('/');
        }
        else{
        for(i in req.session.user.toreadlist ){
          if(req.session.user.toreadlist[i].name==='leaves'){
            res.render('leaves',{error:"Already on your to read list"});
            return;
          }       
        }
        
        var users=getUsers();
        for(i in users){
          if(users[i].username===req.session.user.username){
            users[i].toreadlist.push({name:'leaves',link:'./leaves.jpg',href:'/leaves'});
            req.session.user=users[i];
        
          }
         
        }
        addUsers(users);
        res.render('leaves',{error:"Added Successfuly"});
      }
      })

      //Post method add mockingbird to want to read list
      app.post("/addMockingBird",function(req,res){
        if(req.session.user===null){
          res.redirect('/');
        }
        else{
        for(i in req.session.user.toreadlist ){
          if(req.session.user.toreadlist[i].name==='mockingbird'){
            res.render('mockingbird',{error:"Already on your to read list"});
            return;
          }
        
        }
        var users=getUsers();
        for(i in users){
          if(users[i].username===req.session.user.username){
            users[i].toreadlist.push({name:'mockingbird',link:'./mockingbird.jpg',href:'/mockingbird'});
            req.session.user=users[i];
          }
         
        }
        addUsers(users);
        res.render('mockingbird',{error:"Added Successfuly"});
      }
      })

      app.post("/addSun",function(req,res){
        if(req.session.user===null){
          res.redirect('/');
        }
        else{
        for(i in req.session.user.toreadlist ){
          if(req.session.user.toreadlist[i].name==='sun'){
            res.render('sun',{error:"Already on your to read list"});
            return;
          }
        
        }
        var users=getUsers();
        for(i in users){
          if(users[i].username===req.session.user.username){
            users[i].toreadlist.push({name:'sun',link:'./sun.jpg',href:'/sun'});
            req.session.user=users[i];
          }
         
        }
        addUsers(users);
        res.render('sun',{error:"Added Successfuly"});
      }
      })




      app.get('/registration', function(req,res){
        res.render('registration',{error:""});
      });
      

      //Post Request for Registration
      app.post('/register',function(req,res){
      var x=req.body.username;
      var y=req.body.password;
      var file=fs.readFileSync('users.Json');
      if(x!='' && y!=''){
        if(check_username_exists(x)){
          console.log("Name already exists");
          res.render('registration', {error:"Username already taken"});
        }

       else if(file.toString()==''){
          var a=JSON.stringify([{username:x,password:y,toreadlist:[]}]);
          fs.writeFileSync("users.json",a);
          req.session.user={username:x,password:y,toreadlist:[]};
          res.render('home');
          
        }
        else{
          file=JSON.parse(file);
          file.push({username:x,password:y,toreadlist:[]})
          req.session.user={username:x,password:y,toreadlist:[]}
          var a=JSON.stringify(file);
          fs.writeFileSync("users.json",a);
          res.render('home');
        }
       
        
        }
        
      else{
        res.render('registration',{error:"please enter info"});
      }
      });

        //Get Request when url is /home
        app.get('/home',function(req,res){
          res.render('home');
        });

        //get Request for novels
        app.get('/novel',function(req,res){
            res.render('novel');
        });
        //get Request for novel 1
        app.get('/flies',function(req,res){
          res.render('flies',{error:""});
        })
        //get Request for novel 2
        app.get('/grapes',function(req,res){
          res.render('grapes',{error:""});
        });

        
        //get Request for Poetry
        app.get('/poetry',function(req,res){
          res.render('poetry');
        });
        //get Request for Poetry 1
        app.get('/leaves',function(req,res){
          res.render('leaves',{error:""});
        });
        //get Request for Poetry 2
        app.get('/sun',function(req,res){
          res.render('sun',{error:""});
        });

        //get Request for Fiction
        app.get('/fiction',function(req,res){
          res.render('fiction');
        })
        //get Request for Fiction 1
        app.get('/dune',function(req,res){
          res.render('dune',{error:""});
        });
         //get Request for Fiction 2
         app.get('/mockingbird',function(req,res){
          res.render('mockingbird',{error:""});
        });
        
        //get Request for Reading list
        app.get('/readlist',function(req,res){
          if(req.session.user==null){
              res.redirect('/')
          }else{
          var toread= req.session.user.toreadlist;
          res.render('readlist',{toread})}
      });

          app.post('/search',function(req,res){
            var searchtext= req.body.Search
            var AllBooks = [{name:'Dune',link:'./dune.jpg',href:'/dune'},
            {name:'Lord of the flies',link:'./flies.jpg',href:'/flies'},
            {name:'Grapes of Wrath',link:'./grapes.jpg',href:'/grapes'} ,
            {name:'Leaves of grass',link:'./leaves.jpg',href:'/leaves'},
            {name:'To kill a mockingbird',link:'./mockingbird.jpg',href:'/mockingbird'}
            ,{name:'The sun and her flowers',link:'./sun.jpg',href:'/sun'}
            ]
            var result=[]
            for(var i=0;i<AllBooks.length;i++){
                if(AllBooks[i].name.includes(searchtext)){
                    result.push(AllBooks[i])
                }
            }
           
            res.render('searchresults',{result})
            
        });
        app.get('/searchresults',function(req,res){
          res.render('searchresults',{result})
        })

        //Checks if the username already exists in the databases , returns true if it exists and false if it doesn't
        function check_username_exists(name){
          var file=fs.readFileSync("users.json");
          if(file.toString()==''){
            return false;
          }
          else{
            file=JSON.parse(file);
            for(i in file){
              if(file[i].username==name){
                return true;
              }
            }
            return false;
          }

        }



        //cheks if the username exists in the database and if so , the password is the correct one stored in the database
        //if the name and passwords match (using the index of the array)
        //it returns 1 
        //if the name exists but the password entered does not match the one in the database(incorrect password)
        //it returns 2
        // if the username doesn't even exist in the Database it returns 3  
        function check_credentials(name,password){
          var file=fs.readFileSync("users.json");

          if(file.toString()==''){
            return [0];
          }
          file=JSON.parse(file);
          for(i in file){
            if(file[i].username==name){
              if(file[i].password==password){
                return [1,file[i]];
              }
              else{
                return [2];
              }
            }

          }
          return [3];
        }
        function getUsers(){
          try{ 
            var users= JSON.parse(fs.readFileSync('users.json').toString());
            return users;
          }catch(e){
            return [];
          }
        }
        function addUsers(user){
          var a=JSON.stringify(user);
          fs.writeFileSync('users.json',a);

        }

        
// returns 3 if username doesnt exist 2 if password is incorrect and 1 if they match


app.listen(3000);









