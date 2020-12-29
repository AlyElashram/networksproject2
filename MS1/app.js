
var express = require('express');
var path = require('path');
const { nextTick } = require('process');
var app = express();
var fs=require('fs');



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
      else if(check_credentials(x,y)==0){
        console.log("User does not exist");
        res.render('login',{error:"User does not exist"});
      }
      else if(check_credentials(x,y)==1){
        console.log("username and passwords match");
        res.render('home');
      }
      else if(check_credentials(x,y)==2){
        console.log("incorrect password");
        res.render('login',{error:"incorrect password"});
      }
      else if(check_credentials(x,y)==3){
        console.log("username not registered");
        res.render('login',{error:"username not registered"});
      }


      });



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
          var a=JSON.stringify({user:[x],password:[y]});
          fs.writeFileSync("users.json",a);
          res.render('home');
          
        }
        else{
          file=JSON.parse(file);
          file.user.push(x);
          file.password.push(y);
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
          res.render('flies');
        })
        //get Request for novel 2
        app.get('/grapes',function(req,res){
          res.render('grapes');
        });

        
        //get Request for Poetry
        app.get('/poetry',function(req,res){
          res.render('poetry');
        });
        //get Request for Poetry 1
        app.get('/leaves',function(req,res){
          res.render('leaves');
        });
        //get Request for Poetry 2
        app.get('/sun',function(req,res){
          res.render('sun');
        });

        //get Request for Fiction
        app.get('/fiction',function(req,res){
          res.render('fiction');
        })
        //get Request for Fiction 1
        app.get('/dune',function(req,res){
          res.render('dune');
        });
         //get Request for Fiction 2
         app.get('/mockingbird',function(req,res){
          res.render('mockingbird');
        });
        
        //get Request for Reading list
        app.get('/readlist',function(req,res){
          res.render('readlist')
        });


        //Checks if the username already exists in the databases , returns true if it exists and false if it doesn't
        function check_username_exists(name){
          var file=fs.readFileSync("users.json");
          if(file.toString()==''){
            return false;
          }
          else{
            file=JSON.parse(file);
            for(i in file.user){
              if(file.user[i]==name){
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
          var name_exists=false;
          if(file.toString()==''){
            return 0;
          }
          file=JSON.parse(file);
          for(i in file.user){
            if(file.user[i]==name){
              name_exists=true;
              if(file.password[i]==password){
                return 1;
              }
              else{
                return 2;
              }
            }

          }
          return 3;
        }
// returns 3 if username doesnt exist 2 if password is incorrect and 1 if they match


app.listen(3000);









