const uuid = require("uuid/v4");
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
const os = require("os");
const {Console} = require("console");
 
let cache = {}; 
let opts;
let _info;
let _root;

/**
 * {@TODO} 
 * {1} ADD redis cache;
 * 
*/



module.exports = function(options){
    /*
    * @params
    *   
    *   
    *  
    */

   _info = new Console(process.stdout, process.stderr); //create logger

    opts = !options ? {} : options;

    if(typeof(opts) !== "object"){
            throw new TypeError(`Options must be an object but ${typeof opts} supplied`);
    }; 

    opts.root && typeof(opts.root) === "string" ? _root = opts.root : os.tmpdir(); //if root is not specified, save to OS tmp dir

    opts.root = typeof(opts.root) === "string" && !opts.root.startsWith("/tmp") ? path.resolve(opts.root) : os.tmpdir(); //resolve root or serve from OS tmp dir
    
    typeof(opts.store) === "string" && opts.store.startsWith("/tmp") === false ? opts.store = `${opts.root}${path.sep}${opts.store}` : opts.root;
    
    fs.exists(`${opts.store}`,(exists)=> !exists ? fs.mkdir(`${opts.store}`,{recursive: true},err=> err ? new Error("An error occoured while creating storage folder") : false ) : false ); //check if store exists, if not ,create new folder to store confused js files
    
    /**
     * @{TODO-MULTIPLE DIRECTORIES};
    */
    let staticDir = typeof(opts.directories) !== "object" ? [] : opts.directories;
       
    let obfusciationFolder = opts.store;

    let ReqFolderName;
    // let _Resource; 

    return function(req,res,next){
        _info.log("New Request"+"\n\n");
       let _Resource = req.path;

            /**
             * Check if resource is cached and serve cached result
            */
        if(cache[_Resource] !== undefined){
            _info.log("cached resource", cache[_Resource]);
            return fs.createReadStream(cache[_Resource]).pipe(res).on("finish",()=>{
                    opts.debug && opts.debug === true ? _info.log(`[ file served from cached  : ] ${_Resource}`) : false;
            });
        };

        /*
        * Only process javascript files or files with javascript extensions
        * */
        if( _Resource.endsWith(".js")){
                    
            const orginalFile = opts.root+_Resource;
           
            let dotTrim = _root.startsWith(".") ? _root.split(".")[1] : _root;

            let full_path = orginalFile.includes(`${dotTrim}${dotTrim}`) ? orginalFile.replace(`${dotTrim}${dotTrim}`,dotTrim) : orginalFile;

            _info.log("resource", _Resource) 
            _info.log("full resource path", full_path);
            //check if requested resource exists
            fs.exists(full_path, function(exists){
                
                if(!exists)return next(createError(404));
                               
                        
                    fs.readFile(full_path,"utf-8",(err,data)=>{
                        
                        if(err)return next(err);

                        /**
                         * NOW LETS BE REAL HERE, ._cache WORD IS FREAKISHLY HARD TO PRONOUNCE
                         *  AND FREAKISHILY IS NOT THE WORD I WANTED TO USE.
                         * BUT HEY, HERE IS WHERE YOU CONFUSE THE ENEMY - OBFUSCATE (Damn!!!)
                        */
                        obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
                                                                                    compact: false,
                                                                                    controlFlowFlattening: true
                                                                                }
                                                                                );

                          
                        let obsfuscadedFile =`${obfusciationFolder}${path.sep}${uuid()}.js`

                        //write confused file
                        fs.writeFile(obsfuscadedFile,obfuscationResult.getObfuscatedCode(),function(err){
                            if(err){
                                return next(err);
                            }
                            cache[_Resource] = obsfuscadedFile;
                            //read confused and pipe to response object 
                          return  fs.createReadStream(obsfuscadedFile).pipe(res).on("finish",()=>{
                                //cache request after pipe is done
                              
                                opts.debug && opts.debug === true ? _info.log(`[ file saved to cached  : ] ${_Resource}`) : false;

                    
                            });
                        })
                          

                    });
            })

            
           
        }else{
            next();
        }
       
    }
}