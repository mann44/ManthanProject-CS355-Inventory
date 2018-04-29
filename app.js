/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//load customers route
var customers = require('./routes/customers');
var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');
var products = require("./routes/products");
var purchases = require("./routes/purchases");
var vendors = require("./routes/vendors");
var ratelist = require("./routes/ratelist");
// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
app.use(

    connection(mysql,{

        host: 'blue.cs.sonoma.edu',
        user: 'mgajjar',
        password : '5768352',
        port : 3306, //port mysql
        database:'mgajjar_db'
    },'request')
);//route index, hello world
module.exports = app;
app.get('/', routes.index);//route customer list
app.get('/customers', customers.list);//route add customer, get n post
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);//route delete customer
app.get('/customers/delete/:id', customers.delete_customer);//edit customer route , get n post
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);

app.get('/products', products.list);//route add customer, get n post-->
app.get('/products/add', products.add);
app.post('/products/add', products.save);//route delete customer
app.get('/products/delete/:product_id', products.delete_customer);//edit customer route , get n post
app.get('/products/edit/:product_id', products.edit);
app.post('/products/edit/:product_id',products.save_edit);


app.get('/purchases', purchases.list);//route add customer, get n post
app.get('/purchases/add', purchases.add);
app.post('/purchases/add', purchases.save);//route delete customer
app.get('/purchases/delete/:purchase_id', purchases.delete_customer);//edit customer route , get n post
app.get('/purchases/edit/:purchase_id', purchases.edit);
app.post('/purchases/edit/:purchase_id',purchases.save_edit);

//route add customer, get n post
app.get('/vendors', vendors.list);
app.get('/vendors/add', vendors.add);
app.post('/vendors/add', vendors.save);//route delete customer
app.get('/vendors/delete/:vendor_id', vendors.delete_customer);//edit customer route , get n post
app.get('/vendors/edit/:vendor_id', vendors.edit);
app.post('/vendors/edit/:vendor_id',vendors.save_edit);

app.get('/ratelist', ratelist.list);//route add customer, get n post
app.get('/ratelist/add', ratelist.add);
app.post('/ratelist/add', ratelist.save);//route delete customer
app.get('/ratelist/delete/:list_id', ratelist.delete_customer);//edit customer route , get n post
app.get('/ratelist/edit/:list_id', ratelist.edit);
app.post('/ratelist/edit/:list_id',ratelist.save_edit);
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});