const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path=require('path');
const seeds=require('./seeds_data.js');
const ferts=require('./fertilisers_data.js');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.get('/hypothesis',(req,res)=>{
    res.render('hypothesis.ejs');
});

app.get('/help',(req,res)=>{
    res.render('chatbot.ejs');
});

app.get('/schedule',(req,res)=>{
    res.render('schedule.ejs');
});

app.get('/products',(req,res)=>{
    // console.log(ferts);
    res.render('product.ejs',{seeds,ferts});
});

app.get('/products/:id',(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let product=ferts.find((p)=>{return p.id===id});
    if(product==undefined){
        product=seeds.find((p)=>{return p.id===id});
    }
    // console.log(product);
    res.render('prod_details.ejs',{product});
});

app.get('/products/:id/checkout',(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let product=ferts.find((p)=>{return p.id===id});
    if(product==undefined){
        product=seeds.find((p)=>{return p.id===id});
    }
    res.render('checkout.ejs',{product});
});

app.listen(port, () => {
  console.log(`Port is listening at port : ${port}`);
});
