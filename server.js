
const express = require('express');
const app = express();
const fetch = require('node-fetch');
var logger = require('morgan');
var cors = require('cors');
var bodyParser= require('body-parser');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

let myData=[
    {name: "payam",  user:'jetcityproducts',password:'Annaalisa1'},
    {name: "artem",  user:'',password:''},
    {name: "payam1", user:'',password:''},
  ]
app.post('/', async (req, res) => { 

    const lpn = req.body.lpn
    const username= req.body.user

    let obj1 = myData.find(o=>o.name === username)

    let user= obj1.user
    let pass= obj1.password


    const url = 'https://ws.sanmar.com:8080/SanMarWebService/webservices/PackingSlipService?wsdl';

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pac="http://ws.sanmar.com/webservices/PackingSlip">
        <soapenv:Header/>
        <soapenv:Body>
           <pac:GetPackingSlip>
              <pac:wsVersion>1.0.0</pac:wsVersion>
              <pac:UserId>${user}</pac:UserId>
              <pac:Password>${pass}</pac:Password>
              <pac:PackingSlipId>${lpn}</pac:PackingSlipId> 
           </pac:GetPackingSlip>
        </soapenv:Body>
     </soapenv:Envelope>`;
    //  Another LPN:   R0083568529
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
        },
        body: data,
    });
    
    const text = await response.text();
    res.send(text)

});

app.get('/', async (req, res)=>{
    
    res.send("welcome...")
   
})

const port = process.env.PORT || 9000;
var server = app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});

module.exports = app;