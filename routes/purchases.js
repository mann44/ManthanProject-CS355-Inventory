
/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM purchase_view',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('purchases',{page_title:"Purchases",data:rows});


        });

        //console.log(query.sql);
    });

};

exports.add = function(req, res){
    res.render('add_purchases',{page_title:"Add purchases "});
};

exports.edit = function(req, res){
    var purchase_id = req.params.purchase_id;
console.log("==========purchase_id value is =============", purchase_id)
    req.getConnection(function(err,connection){

        var query = connection.query('select * from purchases where purchase_id = ?;',[purchase_id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('edit_purchases',{page_title:"Edit Purchases ",data:rows});


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

            id: input.id,
            product_id : input.product_id,
            purchase_date  : input.purchase_date

        };

        var query = connection.query("INSERT INTO purchases set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/purchases');

        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var purchase_id = req.params.purchase_id;

    req.getConnection(function (err, connection) {

        var data = {

            id: input.id,
            product_id : input.product_id,
            purchase_date  : input.purchase_date
        };

        connection.query("UPDATE purchases set ? WHERE purchase_id = ? ",[data,purchase_id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.redirect('/purchases');

        });

    });
};


exports.delete_customer = function(req,res){

    var purchase_id = req.params.purchase_id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM purchases  WHERE purchase_id = ? ",[purchase_id], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/purchases');

        });

    });
};


