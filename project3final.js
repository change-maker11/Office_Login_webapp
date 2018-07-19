var express=require('express');
var mysql=require('mysql');
var bodyparser=require('body-parser');
var multer  = require('multer');
var nodemailer=require('nodemailer');
var app=express();
//view engine
app.set("view engine",'ejs');

//static folder
app.use(express.static('public'));

//upload details for multer
var storage=multer.diskStorage({
    destination:'public/uploads',
    filename :function(req,file,callback)
    {
        callback(null,file.fieldname+Date.now()+file.originalname);
    }
});
var upload=multer({storage:storage});


//for body parser
var parser=bodyparser.urlencoded({extended:false});
var val={undefined};

//homepage route
app.get("/",function(req,res)
{
    res.render('index',{data:"",check:"",values:val,sucess:""});
});

//login existing account
app.post("/login",parser,function(req,res){
    console.log(req.body);
   getinfo(req.body,function(data,err){
        if(data==undefined)
        response404(res);
        else if(data.pass!=req.body.pass)
        {
            res.render('index',{data:"wrong password try again!!!",check:"",values:val,sucess:""});
        }
        else 
        {
            console.log(data);
            res.render('profilehome',{info:data,sendsucess:""});
        }
    });

});

//creating new account
app.post('/new',upload.single('pic'),function(req,res){
    console.log(req.file);
    if(req.file==undefined)
    {
        var no={};
        if(req.body.gender=='F')
        no={filename:"nopicf.jpg"};
        else
         no={filename:'nopic.jpg'};
        req.file=no;
    }
    checkemail(req.body.newemail,function(response,err){
        if (response==true)
        res.render('index',{data:"",check:"email already taken" ,values:req.body,sucess:""});
        else
        {
        createacc(req.body,req.file.filename);
        res.render('index',{data:"",check:"",values:val,sucess:"Account Created Please Login..."})
        }
    });


});

//sending email in profile
var storagetemp=multer.diskStorage({
    destination:'public/temp',
    filename:function(err,file,callback){
        callback(null,file.originalname);
    }
});
var send=multer({storage:storagetemp});


app.post('/send',send.single('file'),function(req,res)
{
    console.log("the req of mail is  ");
    sendmail(req,function(req,info){
        console.log("returned from send mail.....");
        res.render('sucessemail2',{sent:"email sent sucessfully",button:"button"
        });
    });
   // res.render('sucessemail',{sent:"Sending Email Please Wait....",button:"hidden"});
});


//server running
app.listen(1000);
console.log("Server Listening to port 1000.....");

//creating sql connection
var con=mysql.createConnection({
    host:'localhost',
    user:'root',    
    password:'PASSWORD HERE',                    // Add SQL Password Here
    database:'social'
});
con.connect(function(err){
    if (err)
    throw console.log(err);
});

//function to get info of existing profile
function getinfo(data,callback)
{
    var myquery='select * from info where email="'+data.email+'"';
        console.log(myquery);
        con.query(myquery,function(err,res,feilds){
            if (err) throw (err);
            console.log("response is" + res[0]);
            return callback(res[0]);
        });
}

//response when email not present
function response404(res)
{
    res.render("response404");
}

//funtion to check email so no doble emails are added in database
function checkemail(data,callback)
{
    console.log("entered email :"+ data);
    var query='select email from info where email ="'+data+'"';
    con.query(query,function(err,result,feilds){
        console.log("result is"+result[0]);
        if(result[0]==undefined)
        return callback(false);
        else
        return callback(true);
    })
}

//function creating account and storing info in database
function createacc(data,file)
{
    console.log("inside create account function");
    var query='insert into info values ("'+data.firstname+'","'+data.surname+'","'
    +data.newemail+'","'+data.pass+'","'+data.date+'","'+data.month+'","'+data.year+'","'+data.gender+'","'+file+'")';
    con.query(query,function(err,response,feilds){
        if(err)
        throw err;
        return;
    });

}


//function to sendmail
function sendmail(req,callback)
{
    console.log("inside mailing function");
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:
        {
            user:'Gmail ID Here',             //add your email Id Here
            pass:'Password Here'              //Gmail Password Here
        }
    });

    var mailing=
    {
        from:auth.user,
        to:req.body.reciever,
        subject:req.body.text,
        attachments:undefined
    };
    if(req.file!=undefined)
    mailing.attachments=
        {
            filename:req.file.filename,
            path:req.file.path
        };


    transporter.sendMail(mailing,function(err,info){
        if(err)
        throw (err);
        console.log("email.sent");
        return callback();

    });

}