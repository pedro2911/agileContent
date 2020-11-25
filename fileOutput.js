
const fs = require('fs');
var fileOutput = {
    /** Nome do arquivo */
    fileName: undefined,
    constructor:function(fileName){
        this.setFileName(fileName);
    },
    /** 
        Obtem o valor de fileName
    */
    getFileName:function(){
        return this.fileName;
    },
    /** 
        Altera o valor de fileName
        @param fileName: nome do arquivo 
    */
    setFileName:function(fileName){
        this.fileName = fileName;
    },
    /** 
        Cria um arquivo como padrão CDN agora 
        @param fileData: nome do arquivo de saída junto con a extensão. Ex.: output.txt
        @param format: formato do arquivo de saída ['txt', 'json']
        @param force: força a criar o arquivo ainda que já exista
        @returns JSON {error, message}
    */
    save:async function(fileData, format = 'txt', force = false) {
        const fileName = this.getFileName();
        return new Promise((callback, reject) => {
            if(!force) {
                fs.exists(fileName, function (exists) {
                    if (exists) {
                        const data = format.toLowerCase() === 'json' ? JSON.stringify(fileData) : fileData;
                        fs.writeFile(fileName, data, () => {
                            callback({ message: 'The file was created successfully', error: 0 });
                        });
                    } else {
                        callback({ message: 'Error: this file name already exists', error: -1 });
                    }
                });
            } else {
                const data = format.toLowerCase() === 'json' ? JSON.stringify(fileData) : fileData.join("\r\n");
                fs.writeFile(fileName, data, () => {
                    callback({ message: 'The file was created successfully', error: 0 });
                });
            }
        });
    }
};

module.exports = fileOutput;