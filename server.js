// import fetch from 'node-fetch';

const express = require('express');
const app = express();
const fetch = require('node-fetch')
const cors = require('cors');

app.use(cors());

app.get('/', async (req, res)=>{
    res.send("Welcome to Pamiran")
    const url = 'https://ws.sanmar.com:8080/SanMarWebService/webservices/PackingSlipService?wsdl';

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pac="http://ws.sanmar.com/webservices/PackingSlip">
        <soapenv:Header/>
        <soapenv:Body>
           <pac:GetPackingSlip>
              <pac:wsVersion>1.0.0</pac:wsVersion>
              <pac:UserId>jetcityproducts</pac:UserId>
              <pac:Password>Annaalisa1</pac:Password>
              <pac:PackingSlipId>LP0089954082</pac:PackingSlipId>
           </pac:GetPackingSlip>
        </soapenv:Body>
     </soapenv:Envelope>`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            // 'Authorization': 'Basic amV0Y2l0eXByb2R1Y3RzOkFubmFhbGlzYTE=',
        },
        body: data,
    });
    
    const text = await response.text();

    console.log("from sanmar:",text);
   
})

 app.listen(9000, function(){
    console.log(`Listening on port 9000 ...`);
});


