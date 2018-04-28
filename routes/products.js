
/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM product_view',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('products',{page_title:"products",data:rows});


        });

        //console.log(query.sql);
    });

};

exports.add = function(req, res){
    res.render('add_products',{page_title:"Add Products "});
};

exports.edit = function(req, res){

    var product_id = req.params.product_id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM products WHERE product_id = ?',[product_id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_products',{page_title:"Edit products ",data:rows});


        });

        //console.log(query.sql);
    });
};

/*Save the customer*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    console.log('=============INPUT VALUE===========', JSON.stringify(input));
    req.getConnection(function (err, connection) {

        var data = {
            product_name : input.product_name,
            product_rate   : input.product_rate
        };

        var query = connection.query("INSERT INTO products  set ? ",data, function(err, rows)
        {
            if (err) console.log("Error inserting : %s ",err );
            res.redirect('/products');
        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var product_id = req.params.product_id;

    req.getConnection(function (err, connection) {
        var data = {
            product_name: input.product_name,
            product_rate: input.product_rate
        };

        connection.query("UPDATE products set ? WHERE product_id = ? ",[data,product_id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.redirect('/products');

        });

    });
};


exports.delete_customer = function(req,res){

    var product_id = req.params.product_id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM products  WHERE product_id = ? ",[product_id], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/products');

        });

    });
};


