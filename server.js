/*********************************************************************************
 *  WEB322 – Assignment 03
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
 *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Emirhan Yildiirim Student ID: 155416225 Date: 7/1/2024
 *
 *  Vercel Web App URL: https://web322-a3-gules.vercel.app/
 *
 *  GitHub Repository URL: https://github.com/emiryldm19/Web322-A3
 *
 ********************************************************************************/

const express = require('express');
const app = express();
const path = require('path');
const storeService = require('./store-service.js')
app.use(express.static('public'));


//about route
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname, '/views/about.html'))
})

//default route 
app.get('/', (req, res)=>{
    res.redirect('/about')
});
//items route route 
app.get('/items', (req, res)=>{
    storeService.getAllItems()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    })
});
//categories route 
app.get('/categories', (req, res)=>{
    storeService.getCategories()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err);
    })
});

//shop route
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
});

//404 route
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});


//set up the port
const HTTP_PORT= process.env.port||8080;

//listen the server
//call the initialize function
storeService.initialize()
.then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`listening on ${HTTP_PORT}, initialize function invoked`);
    }) 
})
.catch(err=>{
    console.log(err);
});
