let modules = require('./modules/module');
let control = require('./controllers/control');
let express = modules.express;
let app = modules.app;
let con = modules.con;
app.set('view engine', 'ejs');


app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

con.connect(err => {
    if(err) throw err;
    app.get('/' ,control.index);
    app.post('/kirim-email',control.sendMail);
    app.post('/', control.addEmail);
    app.delete('/:id', control.delEmail)
    app.listen(3001);

})
