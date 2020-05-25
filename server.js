const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static('.'));
app.use(bodyparser.json());
app.get('/catalogData',(req,res)=>{
    fs.readFile('./catalogData/catalog.json','utf-8',(err,data)=>{
        if(!err){
            res.send(data);
        }
    })
})
app.get('/cartItems',(req,res)=>{
    fs.readFile('./catalogData/cart.json','utf-8',(err,data)=>{
        if(!err){
            res.send(data);
        }
    })
})
app.post('/addToCart',(req,res)=>{
    fs.readFile('./catalogData/cart.json','utf-8',(err,data)=>{
        if(!err){
            const cart = JSON.parse(data);
            const item = req.body;
    
            let el = cart.find((elem) => elem.id_product == item.id_product);
                if (el != undefined) {
                    el.count++;
                    el.totalPrice += el.price;
                } else {
                    item.count = 1;
                    item.totalPrice = item.price;
                    cart.push(item);
                }
                
            fs.writeFile('./catalogData/cart.json',JSON.stringify(cart),(err)=>{
                console.log('done');
            })
        }
        
    })
})
app.post('/removeFromCart',(req,res)=>{
    fs.readFile('./catalogData/cart.json','utf-8',(err,data)=>{
        if(!err){
            const cart = JSON.parse(data);
            const item = req.body;
    
            let el = cart.find((elem) => elem.id_product == item.id_product);
            if (el != undefined && el.count > 1) {
                el.count--;
                el.totalPrice -= el.price;
            } else if (el.count == 1) {
                console.log('elem naiden');
                let indx = cart.indexOf(el);
                if (indx > -1) {
                    cart.splice(indx, 1);
                }
            }
                
            fs.writeFile('./catalogData/cart.json',JSON.stringify(cart),(err)=>{
                console.log('done');
            })
        }
        
    })
})
app.listen(3000,function(){
    console.log('server is running');
})