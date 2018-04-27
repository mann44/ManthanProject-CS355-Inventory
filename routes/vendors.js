
/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM vendors',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('vendors',{page_title:"vendors",data:rows});


        });

        //console.log(query.sql);
    });

};

exports.add = function(req, res){
    res.render('add_vendors',{page_title:"Add vendors "});
};

exports.edit = function(req, res){

    var vendor_id = req.params.vendor_id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM vendors WHERE purchase_id = ?',[vendor_id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_vendors',{page_title:"Edit vendors ",data:rows});


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

            <!--vendor_id: input.vendor_id,-->
            product_id : input.product_id,
            vendor_name  : input.vendor_name,
            vendor_address : input.vendor_address,
            vendor_phone : input.vendor_phone,
            vendor_price : input.vendor_price

        };

        var query = connection.query("INSERT INTO vendors set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/vendors');

        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var purchases_id = req.params.purchases_id;

    req.getConnection(function (err, connection) {

        var data = {

            id: input.id,
            product_id : input.product_id,
            purchase_date  : input.date

        };

        connection.query("UPDATE purchases set ? WHERE purchases_id = ? ",[data,purchases_id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.redirect('/purchases');

        });

    });
};


exports.delete_customer = function(req,res){

    var purchases_id = req.params.purchase_id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM purchases  WHERE purchase_id = ? ",[purchases_idid], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/purchases');

        });

    });
};


