const express=require('express');
const path=require('path');
const fs=require('fs');
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactform', {useNewUrlParser: true, useUnifiedTopology: true});
const app=express();
const port= process.env.PORT||5000;
// database schema
const contactSchema= new mongoose.Schema({  // my schema is defined
    name: String,
    email:String,
    phone:String,
    address:String,
    desc:String
  });
// schema change into model
const Contact = mongoose.model('Contact', contactSchema);  
// express specific stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());
//  PUG SPECIFUC STUFF
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{   
    const params={}
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{   
    const params={}
    res.status(200).render('contact.pug',params);
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.render('response.pug');
    }).catch(()=>{
    res.status(400).send("item was not saved to the database")
})});

app.get('/about',(req,res)=>{   
    const params={}
    res.status(200).render('about.pug',params);
});
app.get('/services',(req,res)=>{   
    const params={}
    res.status(200).render('services.pug',params);
});
app.get('/class',(req,res)=>{   
    const params={}
    res.status(200).render('class.pug',params);
});
app.listen(port,()=>{ // port listen here
    console.log(`the application is running at ${port}!`); // ${} is used to var without concat + operator
})