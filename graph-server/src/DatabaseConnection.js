// database connection
const mongo = require("mongodb");

class DatabaseConnection{
    
    constructor(){
        // make the connection
        this.mongoClient = mongo.MongoClient;
        
        
    }
    
    connect(cb){
        
        this.mongoClient.connect( "mongodb://127.0.0.1:27017" , (err,client)=>{
        
            DatabaseConnection.instance.myConn = client.db("GameDatabase");

            DatabaseConnection.instance.client = client;
            
            cb(err);
        }  );
        
    }
    
    insertRow(jsonObject, col, cb){
        this.myConn.collection(col).insertOne(jsonObject , (err,res)=>{
            cb(err,res);            
        });
    }
    
    deleteRow(jsonObject, col, cb) {
        this.myConn.collection(col).deleteOne(jsonObject , (err,res)=>{
            cb(err,res);            
        });
    }

    findAll(col , predicate, cb){
        this.myConn.collection(col).find(predicate).toArray(cb); 
    }
    
    static getInstance(cb){
        
        if( DatabaseConnection.instance == null ){
            DatabaseConnection.instance = new DatabaseConnection();
            DatabaseConnection.instance.connect( (err)=>{
                
            cb(DatabaseConnection.instance);    
            } );
        }else{
            
            cb(DatabaseConnection.instance);
        }
        
        
        
    }
    close(){
        this.client.close();
        DatabaseConnection.instance = null;
    }
    
}

DatabaseConnection.instance = null;
module.exports = DatabaseConnection;