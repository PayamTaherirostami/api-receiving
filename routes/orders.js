var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');

router.get('/', async (req, res)=>{
    
    res.send("welcome to orders")
   
})



router.post('/', async (req, res) => { 
    const lpn = req.body.lpn

    // console.log("lpn:",req.body.lpn);
    const url = 'https://ws.sanmar.com:8080/SanMarWebService/webservices/PackingSlipService?wsdl';

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pac="http://ws.sanmar.com/webservices/PackingSlip">
        <soapenv:Header/>
        <soapenv:Body>
           <pac:GetPackingSlip>
              <pac:wsVersion>1.0.0</pac:wsVersion>
              <pac:UserId>jetcityproducts</pac:UserId>
              <pac:Password>${process.env.REACT_APP_RAPID_API_KEY}</pac:Password>
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


module.exports = router;