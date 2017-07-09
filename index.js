var stripe =require('stripe')('sk_test_wj9WJ8VPsIggeqoWZHRYMjVF');
var express = require('express');
var bodyParser = require('body-parser');
var cors= require('cors');

var app =  express();
var router = express.router();

app.use(bodyParser.urlEncoded({extended:false}));

app.use(cors());

router.post('/processpay',function(request,response){
    var stripetoken = request.body.stripetoken;
    var amountpayable = request.body.amount;
    var charge = stripe.charge.create({
        amount : amountpayable,
        currency: 'usd',
        description : 'sample transaction',
        source : stripetoken
    },function(err,charge){
        if(err)
            console.log(err);
        else{
            response.send({success:true});
        }
    })
})

app.use(router);
app.listen(3333,function(){
    console.log('server is running');
})



)