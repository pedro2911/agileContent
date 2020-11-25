const request = require('request');
var cdnReader = {
    /** Url da fonte do arquivo */
    url: undefined,
    /** Dados do arquivo */
    data: undefined,
    constructor:function(url){
        this.setUrl(url);
    },
    /** 
        Obtem a url do arquivo
    */
    getUrl: function(){
        return this.url;
    },
    /** 
        Altera a url do arquivo
        @param url URI do arquivo
    */
    setUrl: function(url){
        this.url = url;
    },
    /** 
        Obtem os dados do arquivo baixado
    */
    getDataCDN: function(){
        return this.data;
    },
    /** 
        Altera os dados (localmente) do arquivo 
        @param data Dados para salvar formato JSON
    */
    setDataCDN: function(data){
        this.data = data;
    },
    /** 
        Altera os dados (localmente) do arquivo 
        @param format formato de retorno dos dados baixados ['text', 'json']
        @returns JSON {error, message, data}
    */
    getData: async function(format = 'text'){
        const url = this.getUrl();
        return new Promise(function(callback,reject){
            request(url, { json: true, timeout: 300000 }, (err, res, body)=> {
                var result = [];
                if (err) { 
                    callback({error: -1, message: `Request error: ${res.err}`, data: []});
                }
                else{
                    const dataHTTP=res.body.split('\r\n');
                    dataHTTP.splice(dataHTTP.length-1,1);
                    dataHTTP.forEach(element => {
                        element = element.split('|');
                        const method = element[3].split('/');
                        element[2] = element[2] === 'INVALIDATE' ? 'REFRESH_HIT' :element[2]
                        if(format.toLowerCase() === 'json') {
                            result.push({
                                partner:'"MINHA CDN"',
                                method: method[0].replace(/"/g, ''),
                                statusCode:element[1],
                                path: '/'+method[1].split(' ')[0],
                                time: parseInt(element[4]),
                                size: element[0],
                                message: element[2]
                            });
                        } else {
                            result.push(
                            "\"MINHA CDN\" " + method[0].replace(/"/g, '') + " " + element[1] + " " +
                            method[1].split(' ')[0] + " " + parseInt(element[4]) + " " + element[0] + " " + element[2]
                            );
                        }
                    });
                    callback({error: 0, message: 'request ok', data: result});
                }
            });
        });
    }
};

module.exports = cdnReader;