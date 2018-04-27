
/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM ratelist',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('ratelist',{page_title:"ratelist",data:rows});


        });

        //console.log(query.sql);
    });

};

exports.add = function(req, res){
    res.render('add_ratelist',{page_title:"Add ratelist "});
};

exports.edit = function(req, res){

    var list_id = req.params.list_id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM ratelist WHERE list_id = ?',[list_id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_ratelist',{page_title:"Edit ratelist ",data:rows});


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
            list_id  : input.list_id,
            product_id : input.product_id,
            vendor_id : input.vendor_id

        };

        var query = connection.query("INSERT INTO ratelist set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/ratelist');

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


