# Product Image Upload(From Local)
- Upload the Product Images to BigCommerce.

# Pre-requisites
## Node Version
V20.11.0
## NPM Version
10.2.4

## Config
```
    const storeHash = 'XXXXXXXXXXXXXX';
    const accessToken = 'XXXXXXXXXXXXXX';
    const folderPath = 'D:/XXXXXXXXXXXXXXXXXXXX/';
    const newFolderPath = 'D:/XXXXXXXXXXXXXXXXXXXX/';

    /* ONLY MENTION SKU NAMES, THE NAMES OF THE SKU SHOULD BE PRESENT IN "folderPath" directory. */
    const loadOnlyFiles = ["SKU1", "SKU2"]
```

# Run
```node upload-data.js```

# Debugging
- To be checked in error.log.