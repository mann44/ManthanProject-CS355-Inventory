# ManthanProject-CS355-Inventory
	 
Formal Report

Overview
The database constructed in this project is of an application which keeps track of products customers and vendors which is being called as Check&Track. Check and Track helps people to keep detailed track of their customers. The same way it keeps track of their vendors also. This application specifically focus on 3 aspects, once when customer buy something from us, it keeps track of purchase items. The vendor table keeps track of vendor and a single vendor can provide multiple products. A purchase table keeps track of customer and purchase item.  This database consists of five tables which helps in keep track of customers/vendors/products/ratelist properties. Business rules for the database include:
•	Product is a single entity, but It can have multiple buyer
•	Product is a single entity, but I can have multiple supplier and vendors
•	A customer can do multiple purchases
•	Different vendor can provide same product
•	Different vendors can have different rate for same product

Entity Relational Diagram and Relational Schema for Check & Track Database:
An entity relationship diagram for this database is the graphical representation of a Check and Track system that depicts the relationships among customers, products, vendors, purchases within this system. This is the foundation of the relational database. After a relational database is built, this ERD serves as the referral point, for any debugging or business process re-engineering required later. All the objects are called Entities which can be strong or weak which are put into tables. Here Customers, Products and Vendots are strong entities and weak entities are purchases and ratelist. Their characteristics are called attributes which are put into columns. It also shows the relationship between each table which includes a cardinality ratio. For example 1: N  ratio between customer and product means that a customer can have only one address but in an address their can multiple products. From this blue print we will build the relational schema which is the named relation defined by the set of attributes. It shows the primary keys and foreign key relations between the tables. Figure 1 below shows the ERD and figure 2 shows the relational schema.
 

Figure 1
 
Figure 2


Customers Table:

This table will store the complete details of customers. It start wih customer id which is basically a primary key which will be unique for every customers, then their names , address emails including phone numbers.

The following query creates the property address table:
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


The following query insets data into the property address table and resulting table is shown below:

INSERT INTO `customer` ( `name`, `address`, `email`, `phone`) VALUES
( 'Nadya Eka', 'Jl. Ciwidey no 20', 'nadya@yahoo.com', '086454743743'),
( 'Amali', 'Jl. kemandoran no 10 Jakarta', 'amalia@langit.com', '03937263623'),
('Angel ', 'Jl. Ciledug no 45A. tanggerang', 'angel@gmail.com', '082271626121'),
('Ujang', 'Jl. ribut no 90 A', 'ujang@gmail.com', '07846352532'),
('Memet', 'Blok cepu no 14. Bandung', 'memet@ongkek.com', '038372636232'),
('Agung', 'Jl st Petersburg no 34. Russia', 'agung@yahoo.com', '038373273262'),
('Jhon Taylor', 'St paris A . Block 43. paris', 'jtaylor@yahoo.com', '039223232323');
 
 

The following query creates a view to display all the respective table data:
CREATE VIEW customers_view AS SELECT * from customer;
select * from customers_view;

Products:

This table stores the products which will start with unique product Id fillowing by name , rate.The product idis in auto increment mode, so whenever we insert a product it will automatically assigns an id for it which corresponds to exact product name and it also shows it rate also. So Every product id has enough information to roll. 

The following query creates the property table:

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(255) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `product_rate` varchar(100) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


The following query insets data into the property table and resulting table is shown below:

insert into products (product_name, product_rate) values ('Roller', '10');
insert into products (product_name, product_rate) values ('Idler Pulley', '20');
insert into products (product_name, product_rate) values ('Bobbin', '30');
insert into products (product_name, product_rate) values ('Pipes', '40');

 
 


The following query creates a view to display all the respective table data:


create view product_view as select * from products;
select * from product_view;
Purchase

This table stores the purchase information. It has a purchase_id which is primary key and auto increment which uniquely identifies each purchases. Other attributes include customer id and product id, this both are foreign keys of customer table and product table. There is a last type which is date. So in a nutshell it shows that this customer has baught this product on this certain day. 

The following query creates the user table:
create table if not exists `purchases` ( 
`purchase_id` int(255) Not Null auto_increment,
`id` int(255) ,
`product_id` int(255) ,
`purchase_date` varchar(20),
 primary key (`purchase_id`),
 FOREIGN KEY (id) REFERENCES customer(id) ON DELETE CASCADE,
 FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
)  ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

The following query insets data into the user table and resulting table is shown below:
insert into purchases (id, product_id, purchase_date) values ( '5', '1', '2001/11/20'),( '6', '2', '2001/11/25'),( '9', '3', '2001/11/227'),( '10', '4', '2001/11/20');

 

The following query creates a view to display all the respective table data:

CREATE VIEW purchase_view AS SELECT * from purchases;	
select * from purchase_view;




Vendor Table

This table stores the vendors information. It has an attribute vendor_id which a primary key and also set to auto increment. it has property name, its address and phone number which completes the content of vendor table. This table will show it importance in next table where we will use it as a foreign entity.

The following query creates the seller table:

create table if not exists `vendors` ( 
`vendor_id` int(255) Not Null auto_increment,
`vendor_name` varchar(50),
`vendor_address` varchar(50),
`vendor_phone` int(10),
 primary key (`vendor_id`)
)  ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

The following query insets data into the seller table and resulting table is shown below

insert into vendors (vendor_name, vendor_address, vendor_phone) values ('manthan Products', '1324 E cotati, USA', '6692350477'),('Mukesh Industries', '21 Vimal Estate, GJ-INDIA','98252169111'),('S p poly plast','13 Bhagirath Estate, GJ-INDIA','7402536952'),('Gajjar Industires','14 Vimal Estate GJ-INDIA','9825216900');

 


The following query creates a view to display all the respective table data:

create view vendors_view as select * from vendors;
select * from vendors_view;


ratelist  Table

This table stores the ratelist which extracts details from vendor table and product table. So it is a typical vendors price list for variety of products. All vendors can give price for differenct products or same product has different rates form different buyers. This table has primary key of list id and rest of the product id and its rate.

The following query creates the ratelist table:

create table if not exists `ratelist` (
`list_id` int(255) auto_increment,
`product_id` int(255),
`vendor_id` int(255),
primary key(`list_id`),
FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
FOREIGN KEY (vendor_id) references vendors(vendor_id) on delete cascade
)ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

The following query insets data into the buyer table and resulting table is shown below:

insert into ratelist ( product_id, vendor_id) values ('1','9'),('2','10'),('3','11'),('4','12');

 

The following query creates a view to display all the respective table data:
create view rate_view as select * from ratelist;

select * from rate_view;








Stored Procedures & JOIN


The following query creates a stored procedure to insert customer table which is used in the web forms and resulting table is displayed using the view:


 
The following query creates a stored procedure to display all the data from customer JOIN
 
JOIN:

The following query creates a stored procedure to display purchase data from purchase table based on the purchase_id:

delimiter //

create procedure customer_purchase(_purchase_id int)

	begin
		 select * from purchases where purchase_id = _purchase_id;
        
    END //
    
delimiter ;

call customer_purchase(5);
 





The following join query combines data from ratelist table, products table and vendor  table and displays the complete information about each products:

select r.*, p.product_name, p.product_rate,v.vendor_name from ratelist r join products p join vendors v where r.product_id=p.product_id and r.vendor_id = v.vendor_id;

 


The following query displays the sorted customer table based on the alphabetical order of first names:
 

Github:
https://github.com/mann44/ManthanProject-CS355-Inventory.git

-- subquery
select * from customer where id In ( select id from customer where id > 10);
-- join
select id, name, email from customer join  products where customer.id = products.product_id;
-- Not In
select * from vendors where vendor_name not in ('Michael', 'Cheeku');
-- not exists
SELECT name FROM customer WHERE EXISTS (SELECT purchase_id FROM purchases WHERE id = customer.id);
-- compares
select * from products where product_rate > All ( select product_rate from products where product_id < 5);
-- group by
select * from products group by product_name;
-- derived function
select p.product_id, p.product_name, avg(p.product_rate),q.purchase_id from products p join purchases q on p.product_id =q.purchase_id group by q.purchase_date Having q.purchase_date = '2001/11/25';
-- order by
select * from ratelist order by vendor_id;
-- union
select name as people from customer union select vendor_name from vendors;
-- distinct
select distinct purchase_date from purchases;


