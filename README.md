# Instalação
    Clona o projeto 
    git clone https://github.com/pedro2911/agileContent.git

    Instala npm
    npm i

    executa qualquera dos comando indicados abaixo.
    

# 1-AdjacentMaxDistance
    Para este exercicio, eu criei duas versões. Uma da maneira que foi requerida e com entrada de dados manualmente e a segunda muito mais interativa. Nesta última os dados são pedidos via consola.

    Para rodar a versão simples deve executar
    npm run test-matrix-simple

    Para rodar a versão interativa deve executar
    npm run test-matrix

# 2-CDN Agora
    Este exercicio crien 2 extensões para procesar tanto o arquivo de entrada como de saída. 

    Neste código criei a opção de gerar os arquivo com formato .json e de forçar a criação do arquivo caso exista.

    Para rodar sem colocar os parametros de entrada deve executar
    npm run converter-test

    Para rodar passando os parametros de entrada deve executar
    npm run converter -- --sourceUrl='https://s3.amazonaws.com/uux-itaas-static/minha-cdn-logs/input-01.txt' --targetPath='./result.txt'