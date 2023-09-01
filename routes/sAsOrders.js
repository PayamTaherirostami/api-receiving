var express = require('express');
var router = express.Router();
var lpn 
const fetch = require('node-fetch');
const Host= "https://api.ssactivewear.com"

router.post('/', (req, res) => {
     lpn = req.body.number;

    console.log(`Received number: ${lpn}`);
    res.send({ message: `Number received successfully- ${lpn}` });
  });

router.get('/', async (req, res)=>{
    console.log(lpn)
    const method = 'GET';
    const URLPath = `/v2/orders/${lpn}?boxes=true&bpxlines=true`;

    const requestOptions = {
        method: method,
        headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_ACCT + ':' + process.env.REACT_APP_RAPID_SANDS_KEY).toString('base64')
        }
    };
    let Result = '';
    let ErrorText = '';
    let OrderHistory = [];
    let url =Host + URLPath
    try {
        fetch(url,requestOptions)
            .then(response => response.text())
            .then(data => {
                Result = data;
                res.send(data)
                console.log(url)
                    OrderHistory = JSON.parse(Result);
            });
    } catch (ex) {
        ErrorText = ex.message;
    }

    if (!ErrorText) {
        for (let i = 0; i < OrderHistory.length; i++) {
            const OrderNumber = OrderHistory[i].orderNumber;
        }
    }
})
module.exports = router;
