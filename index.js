const uuid = require("uuid/v4");
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");

let cache = {}; 
/**
 * {@TODO} 
 * {1} ADD redis cache;
 * {2} pass custom static folder as parameters
*/

module.exports = function(){
    //admin static folder
        //serves all static files for the admin dashbard, and all admin pages
    let adminStaticDir = path.join(__dirname,`..${path.sep}..${path.sep}static${path.sep}admin${path.sep}`);

    //serve client static files //client static folder
    let clientStaticDir = path.join(__dirname,`..${path.sep}..${path.sep}static${path.sep}client${path.sep}`);

    //where to store obfuscated files :-o Goshh that word is a mouth full
    let obfusciationFolder = path.join(__dirname,`..${path.sep}..${path.sep}static${path.sep}obsfuscatedJavaScripts${path.sep}`);

    //initial requested files location
    let ReqFolderName;
    let _url; //location of javascript

    return function(req,res,next){
      
       
        let url = req.path; //requested url

        //if file requested is clients
        if(url.startsWith("/static/client") || url.startsWith("static/client")){

             _url = req.path.split("/static/client")[1];
            ReqFolderName = clientStaticDir;
        };

        //if file requested belongs to admin
        if(url.startsWith("/static/admin") || url.startsWith("static/admin")){
            
            _url = req.path.split("/static/admin")[1];
            ReqFolderName = adminStaticDir;
        };
        
        //check if request is cached
        if(cache[url] !== undefined){
            return fs.createReadStream(cache[url]).pipe(res).on("finish",()=>{
                console.log("served from cache");
            });
        };

        // file is not cached, so lets process it
            //check if requsted file ends with .js or .js/
        if(url.endsWith(".js") || url.endsWith(".js/")  ){
           
            //full path of ile
            const orginalFile = ReqFolderName+_url;
            //trim any // and replace with /
                //this way you get pretty refined path
            let full_path = orginalFile.replace("//","/");

         

            //check if file exists
            fs.exists(full_path, function(exists){
                
                //if file requested doesnt exist, send a 404;
                if(!exists)return next(createError(404));

                
                        //read contents off file
                    fs.readFile(full_path,"utf-8",(err,data)=>{
                            //check if any error durring reading file
                        if(err)return next(err);

                        /**
                         * NOW LETS BE REAL HERE, THIS WORD IS FREAKISHLY HARD TO PRONOUNCE
                         *  AND FREAKISHILY IS NOT THE WORD I WANTED TO USE.
                         * BUT HEY, HERE IS WHERE YOU CONFUSE THE ENEMY - OBFUSCATE (SHIT!!!)
                        */
                        obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                                                                                    compact: false,
                                                                                    controlFlowFlattening: true
                                                                                }
                                                                                );

                            //create obfuscated filepath , 
                            let obsfuscadedFile = obfusciationFolder+uuid()+".js";

                            //write the file
                            fs.writeFile(obsfuscadedFile,obfuscationResult.getObfuscatedCode(),function(err){
                                        if(err){
                                            return next(err);
                                        }
                                            //read file and pipe it to response object back to the client
                                        fs.createReadStream(obsfuscadedFile).pipe(res).on("finish",()=>{
                                            //cache request after pipe is done
                                            cache[url] = obsfuscadedFile;
                                
                                        });
                            })
                          

                    });
            })

            
           
        }else{
            next()
        }
       
    }
}