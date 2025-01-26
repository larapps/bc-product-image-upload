const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const winston = require('winston');

/** CONFIGURATION */
// OWN DEMO
// const storeHash = 'XXXXXXXXXXXXXX';
// const accessToken = 'XXXXXXXXXXXXXX';


const baseUrl = 'https://api.bigcommerce.com/stores/'+storeHash;
const folderPath = 'D:/XXXXXXXXXXXXXXXXXXXX/';
const newFolderPath = 'D:/XXXXXXXXXXXXXXXXXXXX/';
/** CONFIGURATION */

/** LOGGER */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'info' }),
    ]
});
/** LOGGER */

// let files = fs.readdirSync(folderPath);
logger.info('Files Started');


let loadOnlyFiles = [
    "G040156",
"G043571",
"G046357",
"G046689",
"G047248",
"G049198",
"G049340",
"G049350",
"G049541",
"G049662",
"G049663",
"G049808",
"G049814",
"G049815",
"G049903",
"G049954",
"G050276",
"G050279",
"G050280",
"G050618",
"G050968",
"G051109",
"G051548",
"G051698",
"G051756",
"G051769",
];

logger.info('File Started to Process');

for( let ii=0; ii < loadOnlyFiles.length; ii++ ){
    logger.info('Index: '+ii+', File: '+loadOnlyFiles[ii]);

    let oldPath = folderPath + loadOnlyFiles[ii] + ".jpg";
    if (fs.existsSync(oldPath)) {
        let newPath = newFolderPath + loadOnlyFiles[ii] + ".jpg";
        let sku = loadOnlyFiles[ii];

        logger.info('SKU: '+sku);
        /** GET PRODUCT ID */
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseUrl+'/v3/catalog/products?sku:in='+sku+'&include_fields=id',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'X-Auth-Token': accessToken
            }
        };
        
        axios.request(config)
        .then((response) => {
            let productID = response?.data?.data[0]?.id;
            if(productID !== undefined){
                logger.info('ProductID: '+productID+', Image: '+oldPath+', SKU: '+sku);
        
                /** UPLOAD IMAGES */
                let data = new FormData();
                data.append('image_file', fs.createReadStream(oldPath));
            
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: baseUrl+'/v3/catalog/products/'+productID+'/images',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json', 
                        'X-Auth-Token': accessToken, 
                        ...data.getHeaders()
                    },
                    data : data
                };
            
                axios.request(config)
                .then((response) => {

                    fs.rename(oldPath, newPath, function (err) {
                        if (err) throw err
                        logger.info('ProductID: '+productID+', Image: '+newPath+', Moved');
                    })
                    logger.info('ProductID: '+productID+', Image: '+newPath+', SKU: '+sku+', Response: '+JSON.stringify(response.data));
                })
                .catch((error) => {
                    logger.info('ProductID: '+productID+', Image: '+oldPath+', SKU: '+sku+', Error: '+error);
                });
            }else{
                logger.info(' Image: '+oldPath+', Error: Not Present');
            }
            /** UPLOAD IMAGES */
        })
        .catch((globalError) => {
            logger.info('Image: '+oldPath+', Error: '+globalError);
        });
    }else{
        logger.info('Index: '+ii+', File: '+loadOnlyFiles[ii]+', File Not present');
    }
    
    /** GET PRODUCT ID */
    
}
logger.info('File Ended');
return false;

