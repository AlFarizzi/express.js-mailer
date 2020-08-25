let modules = require("../modules/module");
let timestamp = modules.timestamp;
let nodemailer = modules.nodemailer;
let con = modules.con;
    const index = (req,res) => {
        let data = con.query("SELECT * FROM riwayat", (err,result,fields) => {
            res.render('index', {data:{time:timestamp(), data:result, history:result}});
        })
    }
    
    const addEmail = (req,res) => {
        let nama = req.body.nama;
        let email = req.body.email;
       con.query(`INSERT INTO email VALUES(null, '${nama}', '${email}')`, (err,result) => {
           if(err) throw err;
           res.send(true);
       })
    }

    const delEmail = (req,res) => {
        con.query(`DELETE FROM email WHERE id = '${req.params.id}'`, (err,result) => {
            if(err) throw err;
            res.send('Berhasil');
        })
    }

    const sendMail = (req,res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${req.body.pengirim}`,
                pass: `${req.body.pass}`
            }
        })
        let mailOptions = {
            from : `${req.body.pengirim}`,
            to: `${req.body.penerima}`,
            subject: `${req.body.subject}`,
            text: `${req.body.pesan}`
        }
        transporter.sendMail(mailOptions,(err,info) => {
            if(err) throw err;
            let time = timestamp();
            con.query(`INSERT INTO riwayat 
                VALUES(null, '${req.body.pengirim}', '${req.body.penerima}', '${req.body.subject}', '${req.body.pesan}', '${time}')`, (err,result) => {
                if(err) throw err;
                res.send(true);
                res.end();
            })
        })
    }
    
    module.exports = {
        index: index,
        addEmail: addEmail,
        delEmail: delEmail,
        sendMail: sendMail
    }
