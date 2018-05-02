exports.list = function(req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select * from customer where id In ( select id from customer where id > 10);', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_subquery', {page_title: "SubQuery", data: rows});


        });

        //console.log(query.sql);
    });
}
    exports.list2 = function (req, res) {

        req.getConnection(function (err, connection) {

            var query = connection.query('select id, name, email from customer join  products where customer.id = products.product_id;', function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('q_join', {page_title: "JOIN", data: rows});


            });

            //console.log(query.sql);
        });

    };
    exports.list2 = function (req, res) {

        req.getConnection(function (err, connection) {

            var query = connection.query('select id, name, email from customer join  products where customer.id = products.product_id;', function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('q_join', {page_title: "JOIN", data: rows});


            });

            //console.log(query.sql);
        });

    };
exports.list3 = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('select * from vendors where vendor_name not in (\'Michael\', \'Cheeku\');',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('q_innotin',{page_title:"Not In",data:rows});


        });

        //console.log(query.sql);
    });

};
exports.list4 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT name FROM customer WHERE EXISTS (SELECT purchase_id FROM purchases WHERE id = customer.id);', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_exists', {page_title: "Exists", data: rows});


        });

        //console.log(query.sql);
    });

};
exports.list5 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select * from products where product_rate > All ( select product_rate from products where product_id < 5);', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_compares', {page_title: "Compares", data: rows});


        });

        //console.log(query.sql);
    });

};
exports.list6 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select * from products group by product_name;', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_groupby', {page_title: "Group By", data: rows});


        });

        //console.log(query.sql);
    });

};
exports.list7 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select p.product_id, p.product_name, avg(p.product_rate),q.purchase_id from products p join purchases q on p.product_id =q.purchase_id group by q.purchase_date Having q.purchase_date = \'2001/11/25\';', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_derived', {page_title: "Derived", data: rows});


        });

        //console.log(query.sql);
    });

};
exports.list8 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select * from ratelist order by vendor_id;', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_orderby', {page_title: "Order By", data: rows});


        });

        //console.log(query.sql);
    });

};
exports.list9 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select name from customer union select vendor_name from vendors;', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_union', {page_title: "Union", data: rows});


        });

        //console.log(query.sql);
    });

};
exports.list10 = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('select distinct purchase_date from purchases;', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('q_distinct', {page_title: "Distinct", data: rows});


        });

        //console.log(query.sql);
    });

};