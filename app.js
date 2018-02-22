let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let expressValidator = require('express-validator');

let app = express();

// let logger = (req, res, next) =>{
//     console.log('logging..', );
//     next();
    
// }
// app.use(logger);

// View Engine
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Global Vars
app.use((req, res, next)=>{
    res.locals.errors = null;
    next();
})

// express validator middleware
app.use(expressValidator()); 


let users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com'
    },
    {
        id: 2,
        first_name: 'Will',
        last_name: 'Smith',
        email: 'willsmith@gmail.com'
    },
    {
        id: 3,
        first_name: 'Jill',
        last_name: 'Jackson',
        email: 'jjackson@gmail.com'
    }
]

app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Customers',
        users: users
    });
})

app.post('/users/add', (req, res) =>{
    
    req.checkBody('first_name', 'First Name is Required').notEmpty()
    req.checkBody('last_name', 'Last Name is Required').notEmpty()
    req.checkBody('email', 'Email is Required').notEmpty()
    
    let errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        });
        
    }else {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email        
        }

        console.log('SUCCESS' );
    }
})

app.listen(3000, () => {
    console.log('server started on port 3000...', );
    
})
