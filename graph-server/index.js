/* External Resources */

/* Library dependencies */
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const session = require('client-sessions')
const request = require('request')


/* Projects Classes dependencies */
const Database = require("./src/DatabaseConnection.js")

/* Global variables */
var activeUsers = [];

let CODE = {
    "SUCCESS": 0,
    "ERROR": 1,
}

/* Routes */
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParse.urlencoded( {extended:true} ))

// parse application/json
app.use(bodyParse.json())

app.use('/*', (req, res, next) => {
    console.log('+----------------|')
    console.log('| [Request Body]:', req.body)
    console.log('| [Active Users]:', activeUsers)
    console.log('+----------------|\n')
    next()
})

/*app.use( session( {
    cookieName: 'session',
    secret: 'N0tS0S3krt',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))
*/

/*
 ***********************   API CALLS   *******************************
 */

app.post('/validateToken', (req, res, next) => {
    let token = req.body.token
    let user = req.body.username
    var json

    if (findToken(token)) {
        json = {
            "code": 0
        }
    } else {
        json = {
            "code": 1,
            "content": {
                "message": "Invalid token",
                "description": "The given token has not been found in the server."
            }
        }
    }

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(json)
    res.end()
})

app.post('/getToken', (req, res, next) => {
    
    // Check if account exist and 
    let user = req.body.username
    let pass = req.body.password

    let pred = {
        $and:[
            {username: {$eq:user}},
            {password: {$eq:pass}}
        ]
    };   
    
    Database.getInstance( (inst) => { 
        
        inst.findAll("users", pred, (err,items) => {
            if (err)
                console.log("Error", err)

            var jsonRes;
            var newUser;

            if (items.length >= 1) {
                let type = items[0].accountType
                let generatedToken = generateToken()
                
                jsonRes = {
                    code: CODE.SUCCESS,
                    token: generatedToken
                };

                newUser = {
                    username: user,
                    token: generatedToken
                }
                console.log("[New user]:", newUser)
                activeUsers.push(newUser)

            } else {
                jsonRes = {
                    code: CODE.ERROR,
                    message: 'Your account or password are incorrect'
                };
            }


            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(jsonRes)
            res.end()
        }) 
    });
});

app.get('/getGraphs', (req, res, next) =>{
    
    Database.getInstance( (inst) => { 
        
        inst.findAll("graphs", {}, (err, items) => {
            var jsonRes
            
            if (err) {
                console.log("Error", err)
                jsonRes = {
                    "code": CODE.ERROR,
                    "content": {
                        "message": "Database Error",
                        "description": err
                    }
                }
            } else {
                jsonRes = {
                    "code": CODE.SUCCESS,
                    "content": getVisualGraphsList(items)
                }
            }

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(jsonRes)
            res.end()
        }) 
    })
})

app.post('/saveGraph', (req, res, next) =>{
    
    Database.getInstance( (inst) => { 
        
        let visualGraph = req.body.content

        var content = {
            "version": req.body.version,
            "identifier": req.body.identifier,
            "visualGraph": visualGraph,
            "decisionGraph": visualToDecisionGraph(visualGraph)
        }

        inst.insertRow(content, "graphs", (err, dbres) => {
            var jsonRes
            
            if (err) {
                console.log("Error", err)
                jsonRes = {
                    "code": CODE.ERROR,
                    "content": {
                        "message": "Database Error",
                        "description": err
                    }
                }
            } else {
                jsonRes = {
                    "code": CODE.SUCCESS,
                    "content": "OK"
                }
            }

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.send(jsonRes)
            res.end()
        }) 
    })
})


/* Start server service */
const server = app.listen(8080, () => {
    console.log('Listening at ' + server.address().address);
});


/* Internal Functions */


function generateToken() {
    var token = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 32; i++) {
        token += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return token;
}

function findToken(token) {
    for (i in activeUsers) {
        var user = activeUsers[i]
        if (user.token == token) {
            return true
        } 
    }
    return false
}

function visualToDecisionGraph(json){
    var data = []
    let nodes = json.nodeDataArray
    let links = json.linkDataArray 

    for (i in nodes){
        let node = nodes[i]
        let decision = {
            "id": node.key,
            "question": node.text,
            "character": node.character,
            "optionYes": node.optionYes,
            "optionNo": node.optionNo,
            "childrenYes": [],
            "childrenNo": [],
            "effectYes": node.effectYes,
            "effectNo": node.effectNo
        }
        
        for (j in links) {
            let link = links[j]
            if (link.from == node.key) {
                if (link.type === "Si") {
                    decision.childrenYes.push(link.to)
                } else {
                    decision.childrenNo.push(link.to)
                }
            }
        }        

        var cYes = decision.childrenYes 
        var cNo = decision.childrenNo

        // Set default children

        if (cYes.length == 0) {
            cYes.push(nodes[0].key)
        }

        if (cNo.length == 0) {
            cNo.push(nodes[0].key)
        }

        data.push(decision)
    }

    return data    
}

function getVisualGraphsList (items) {
    var json = []
    
    for (i in items) {
        json.push(items[i].visualGraph)
    }

    return json
}