const timestamp = require('time-stamp');
const mysql = require("mysql");
const express = require("express");
const nodemailer = require("nodemailer")
var app = new express();
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "express-mailer"
})
module.exports = {
    timestamp: timestamp,
    mysql: mysql,
    express: express,
    con: con,
    app: app,
    nodemailer: nodemailer
}