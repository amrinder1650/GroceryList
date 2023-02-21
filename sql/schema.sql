drop database IF EXISTS grocery_database;

create database grocery_database;

use grocery_database;

create table groceries (
  id int not null AUTO_INCREMENT,
  quantity int not null,
  description varchar(25),
  done boolean,
  orderNum int default 0,
  PRIMARY KEY (id)
);

create table historical (
  id int not null AUTO_INCREMENT,
  quantity int not null,
  description varchar(25),
  PRIMARY KEY (id)
);