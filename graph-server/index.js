const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const session = require('client-sessions')
const request = require('request')
const Database = require("./DatabaseConnection.js")

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParse.urlencoded( {extended:false} ))

app.use( session( {
    cookieName: 'session',
    secret: 'N0tS0S3krt',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))

/*
 ***********************   API CALLS   *******************************
 */

app.use('/validateCredentials', (req, res, next) => {
    
})


/*
app.use('/*', (req, res, next) => {
    console.log("[Request Body:]", req.body);
    next();
});

app.get('/', (req, res, next) => {
    const root = __dirname + '/public/';
    console.log('[Session]: '+JSON.stringify(req.session));

    if ( req.session.username != undefined) {
        // Render home html
        renderHome(req.session.username, "", req, res);
    } else {
        // Render login html
        res.sendFile(root + 'login.html');
    }
});

app.get('/login', (req, res, next) => {
    res.redirect('/');
});

app.post('/login', (req, res, next) => {

    const user = req.body.username;
    const pass = req.body.password;
    
    const reqform = {
        url: 'http://localhost:4000/getToken',
        form: {
            username: user,
            password: pass 
        }
    };

    request
        .post( reqform ,(err, response, body) => {
            console.log('[GetToken]: ' + body);
            let jsonres = JSON.parse(body);

            if (jsonres.code == 0) {
                
                req.session.username = user;
                req.session.token = jsonres.token;
                req.session.accountType = jsonres.accountType;
                renderHome(user, "",req, res);
            
            } else {
                renderLoginError(jsonres.message, res);
            }

        });
});

app.post('/logout', (req, res, next) => {
    
    const reqform = {
        url: 'http://localhost:4000/closeSession',
        form: {
            token: req.session.token
        }
    };

    request
        .post( reqform ,(err, response, body) => {
            console.log('[GetToken - Logout]: ', body);

            req.session.reset();
            res.redirect('/');
        });
});

app.post('/database', (req, res, next) => {

    let op = req.body.operation;
    let product = req.body.product;
    let category = req.body.category;
    
    let reqform = {
        url: 'http://localhost:4000/'+op,
        form: {
            token: req.session.token,
            product: product,
            category: category 
        }
    };

    request.post( reqform ,(err, response, body) => {
        console.log('[Database]: ' + body);
        let jsonres = JSON.parse(body);

        if (jsonres.validated == true) {
            renderHome(req.session.username, JSON.stringify(jsonres.message), req, res);
        } else {
            renderDatabaseError(JSON.stringify(jsonres.message),res);
        }
        

    });

});

/* Start server service */
const server = app.listen(8080, () => {
    console.log('Listening at ' + server.address().address);
});


/* Internal Functions */

/*
function renderHome (user, message, req, res) {
    var file;
    switch (req.session.accountType){
        case 'admin': file = "public/homeAdmin.html"; break;
        case 'user': file = "public/home.html"; break; 
        case undefined: file = "public/error.html"; break;
    }

    fs.readFile(file, (err,data) => {
        let toReplace = ""+data;
        let result = message;
        if (result == undefined){
            result = "";
        }
        toReplace = toReplace.replace("#user#", user);
        toReplace = toReplace.replace("#message#", result)
        res.send(toReplace);
    });
}

function renderLoginError (message, res) {
    fs.readFile("public/login.html", (err,data) => {
        let toReplace = ""+data;
        toReplace = toReplace.replace("#message#", message);
        res.send(toReplace);
        res.end();
    });
}

function renderDatabaseError (message, res) {
    fs.readFile("public/error.html", (err,data) => {
        let toReplace = ""+data;
        toReplace = toReplace.replace("#message#", message);
        res.send(toReplace);
        res.end();
    });
}

*/