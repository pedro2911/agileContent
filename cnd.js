const args = require('yargs').argv
const cdnReader = require('./cdnReader'); // leitor do arquivo MINHA CDN
const fileOutput = require('./fileOutput'); // criador do arquivo AGORA

const init = async () => {
    if(args.sourceUrl=="" || args.targetPath=="" || args.sourceUrl==undefined | args.targetPath==undefined){
        console.log("Parametros insuficentes, você debe enviar [sourceUrl] e [targetPath]")
        return;
    }

    cdnReader.constructor(args.sourceUrl);
    cdnResponse = await cdnReader.getData();
    if(cdnResponse.error === 0) {
        console.log("Data was downloaded successful");
        dataCDN = cdnResponse.data;
        cdnReader.setDataCDN(dataCDN);
        fileOutput.constructor(args.targetPath);
        fileResponse = await fileOutput.save(cdnReader.getDataCDN(),'txt',true);
        console.log(fileResponse.message);
    } else {
        console.log(cdnResponse.message);
    }
}

init();