exports.list = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM purchase_view',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('q_subquery',{page_title:"SubQuery",data:rows});


        });

        //console.log(query.sql);
    });

};