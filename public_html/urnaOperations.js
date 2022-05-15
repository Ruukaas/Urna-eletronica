//Os botões de números
let number = document.getElementsByClassName("number"); 

//Os dígitos na tela
let primeiroInput = document.querySelector(".numCandidato:nth-child(1)"); 
let segundoInput = document.querySelector(".numCandidato:nth-child(2)");
let terceiroInput = document.querySelector(".numCandidato:nth-child(3)");
let quartoInput = document.querySelector(".numCandidato:nth-child(4)");
let inputs = [primeiroInput,segundoInput,terceiroInput,quartoInput];

//Ações da urna
let corrige = document.getElementById("corrige");
let confirma = document.getElementById("confirma");
let branco = document.getElementById("branco");

//Cada mensagem que for exibida na tela tem um paragráfo reservado
let nomePartido = document.getElementById("partido");
let nomeCandidato = document.getElementById("candidato");
let mensagemVoto = document.getElementById("mensagemVoto"); //A mensagem do voto confirmado
let mensagemBranco = document.getElementById("mensagemBranco");
let texto = [nomePartido,nomeCandidato,mensagemVoto, mensagemBranco];

//Os números pressionados na urna serão armazenados aqui para serem comparados com o número no indexDB
let numeroVotado="";

console.log("Meu debug de código através do console.log :D");

//Armazena cada botão de número pressionado no numeroVotado
function ArmazenarNumero() {
    console.log("Chamou para armazenarNumero");
    if(inputs[3].value || mensagemBranco.textContent === "Branco") { //Se o quarto digíto estiver preenchido OU a mensagem na tela for branco ele não armazena o número pressionado no numeroVotado
        console.log("O inputs[3] TEM valor OU apertou branco|Chamou pra armazenar o número");
        return;
    }
    else {
        console.log("O inputs[3] NÃO tem valor|Chamou pra armazenar o número");
        let click = this.value; //this value pois quem chama essa função é sempre os botões de números, então ele pega apenas o value de cada botão
        numeroVotado+=click; 
    }  
}

//Função que vai armazenar o número do objeto branco na variável numeroVotado
function armazenarNumeroBranco() { 
    console.log("Chamando armazenarNúmeroBranco");
    numeroVotado = "branco"; //A key do objeto branco é "branco", para quando for armazenar o voto ele saber de qual número ta falando
}

//Função que vai exibir o número na tela quando o usuário pressionar
function inserirNumero () {
    console.log("Chamou o inserir número");
    let numero = this.value; //this value pois quem chama essa função é sempre os botões de números, então ele pega apenas o value de cada botão
    if((mensagemVoto.textContent) === '' && mensagemBranco.textContent === '') { //Se a mensagem de confirmação e a mensagem em branco tiverem vazias ele mostra o número
        for(var i=0;i<4;) {
            if(inputs[i].value) { //Se um dos inputs estiver preenchido ele acrescenta a variável para ir pro próximo input
                i++;
            }
            else { //Se o input não tiver preenchido é pq o número é pra ser exibido naquele input e ele retorna a função
                inputs[i].setAttribute("value",numero);
                return;
            }
        }
    }
    else { //Se a mensagem de confirmação ou a mensagem em branco estiverem com algo não é pra ele exibir número nenhum na tela
        return;
    }
}

//Função que vai chamar a função de exibir na tela o candidato e o partido 
function digitosPreenchidos() {
    console.log("Chamou digitosPreenchidos");
    if(inputs[1].value && !inputs[2].value && !inputs[3].value) { //Quando o usuário preencheu 2 números E não preencheu o terceiro número E não preencheu o quarto numero ele mostra o partido
        console.log("Entrou dentro do if que o input[1] tem que ter valo e o input[2] e [3] não podem ter");
        displayPartido();
    }
    if(inputs[3].value) { //Se o usuário preencheu os 4 números ele mostra o candidato
        console.log("Entrou dentro do IF de inputs[3] tem valor");
        displayCandidato();
    }
}

//Limpa os números que foram armazenados no numeroVotado
function limparNumeroArmazenado() {
    console.log("Chamou a limpeza de número armazenado");
    numeroVotado="";
}

//Limpa todos os números que estão sendo exibidos na tela
function limparNumeros () {
    console.log("Chamou a limpeza dos números");
    for(var i=0;i<4;i++) {
        inputs[i].removeAttribute("value");
    }
}

//Limpa todo o texto que tiver sido exibido na tela(Mensagem branco, voto confirmado, partido e candidado)
function limparTexto () {
    console.log("Chamou o limpar texto");
    for(var i=0;i<texto.length;i++) {
        if(texto[i].hasChildNodes()) {
            texto[i].removeChild(texto[i].firstChild);
        }
    }
}

//Função que vai mostrar o branco na tela
function messageBranco() {
    console.log("Chamou o messageBranco");
    if((mensagemBranco.textContent) === "") { //O objetivo desse if é para caso o usuário aperte + de uma vez o botão branco não aparecer o "branco" várias vezes
        if(!primeiroInput.value){ //Se o primeiro input não tiver preenchido ele exibe a mensagem
           mensagemBranco.appendChild(document.createTextNode("Branco")); 
        }
    }
    else {
        return;
    }    
}

//Função que vai mostrar o voto confirmado na tela
function messageConfirmado() {
    if((mensagemVoto.textContent) === "") { //O objetivo desse if é para caso o usuário aperte + de uma vez o confirma não aparecer o "voto confirmado" várias vezes
        mensagemVoto.appendChild(document.createTextNode("Voto confirmado")); 
    }
    else {
        return;
    }
}

/* Fiz essa função porque como tem que esperar 2 segundos para fazer a limpeza da tela, 
 * durante esse tempo se apertasse o confirma de novo o voto seria armazenado mais uma
 * vez já que ele acontece instantaneamente
 */
//Função que vai desabilitar o botão confirma
function disabled () {
    console.log("Chamou disabled");
     confirma.setAttribute("disabled","disabled");
}

//Função que vai habilitar o botão confirma
function enabled () {
    console.log("Chamou enabled");
     confirma.removeAttribute("disabled","disabled");
}

//Adiciona os eventos em cada um dos botões dos números
for(var element of number) {
    element.addEventListener("click",ArmazenarNumero); //Vem primeiro
    element.addEventListener("click",inserirNumero);
    element.addEventListener("click",digitosPreenchidos);
}

//Os eventos do corrige
corrige.addEventListener("click", limparNumeros);
corrige.addEventListener("click", limparTexto);
corrige.addEventListener("click", limparNumeroArmazenado);
corrige.addEventListener("click", enabled);

//Os eventos do branco
branco.addEventListener("click", messageBranco);
branco.addEventListener("click",armazenarNumeroBranco);


//INDEXDB MISERICÓRDIA

//Classes dos objetos que serão armazenados no IndexDB
class candidato {
        constructor(nome,número,partido, votos) {
            this.nome = nome;
            this.número = número;
            this.partido = partido;
            this.votos = votos;
        }
       
}
class partido {
    constructor (nome, sigla, número, votos) {
        this.nome = nome;
        this.sigla = sigla;
        this.número = número;
        this.votos = votos;
    }
}

//Objetos CANDIDATO
let alexandreFrota = new candidato("Alexandre Frota", "1362", "Partido dos trabalhadores",10);
let arthurLira = new candidato("Arthur Lira", "1311", "Partido dos trabalhadores",1); //Só na minha urna mesmo pra Arthur Lira e Alexandre Frota ser petista
let beneditaDaSilva = new candidato("Benedita da Silva", "1301", "Partido dos trabalhadores",18);
let gleisi = new candidato("Gleisi Hoffmann", "1302", "Partido dos trabalhadores",10);
let mariliaArraes = new candidato("Marília Arraes", "1303", "Partido dos trabalhadores",10);
let joenia = new candidato("Joenia Wapichana", "1801", "Rede sustentabilidade", 18);
let joaoDerly = new candidato("João Derly", "1802", "Rede sustentabilidade", 18);
let miroTeixera = new candidato("Miro Teixera", "1803", "Rede sustentabilidade", 15);
let greta = new candidato("Greta Thunberg", "1804", "Rede sustentabilidade", 15);
let tabata = new candidato("Tabata Amaral", "1201", "Partido Democrático Trabalhista",0);
let tulio = new candidato("Túlio Gadelha", "1202", "Partido Democrático Trabalhista",1);
let silviaCristina = new candidato("Silvia Cristina","1203","Partido Democrático Trabalhista",1);
let damião = new candidato("Damião Feliciano", "1204","Partido Democrático Trabalhista",20);
let votoBranco = new candidato ("Branco",'branco',"Branco",0);
let arrayCandidatos = [alexandreFrota, arthurLira, beneditaDaSilva, gleisi, mariliaArraes, joenia, joaoDerly, miroTeixera, greta, tabata, tulio, silviaCristina, damião,votoBranco];

//Objetos partido
let pt = new partido("Partido dos trabalhadores","PT","13", 20);
let rede = new partido ("Rede sustentabilidade", "REDE", "18", 15);
let pdt = new partido ("Partido Democrático Trabalhista","PDT","12",0);
let arrayPartidos =[pt, rede, pdt];

//Nome do IndexDB
const dbName = "Urna";

let db; //Vai armazenar o resultado da operação de abertura do banco

//Nomes das stores do IndexDB
const storeCand = "Candidatos";
const storePart = "Partidos";

//Função genérica de erro
function requestError (event) {
    console.error("Error", event.target.error);
}

//Função de criação do banco de dados
const createDB = () => {
    if(window.indexedDB) {
        const request = window.indexedDB.open(dbName,1);
        request.onerror = requestError;
        
        
        request.onsuccess = (event) => {
            db = request.result;
            console.log("on success");
            //Quando o banco é realizado com sucesso ele chama as funções de adicionar candidatos e partidos
            addCandidatosIndexDB();  
            addPartidosIndexDB();  //Dar um catch no erro de quando der refresh na pagina e já foi adicionado os candidatos e partidos no indexDB?
        };
        
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            let objectStoreCandidatos = db.createObjectStore(storeCand,{keyPath:"número"});
            let objectStorePartidos = db.createObjectStore(storePart,{keyPath:'número'});      
            console.log("on upgraded", event);
        };
    }  
};

//Função que adiciona candidatos no banco 
const addCandidatosIndexDB = () => {
    
    const transactionAdd = db.transaction(storeCand, "readwrite");
    const objectStore = transactionAdd.objectStore(storeCand);
    
    for (var element of arrayCandidatos) {
        objectStore.add(element);
    }
    
    transactionAdd.oncomplete = (event) => {
        console.log("Adicionou candidatos no IndexDB");
    };
    
    transactionAdd.onerror = requestError;
};

//Função que adiciona partidos no banco
const addPartidosIndexDB = () => {
    const transactionAdd = db.transaction(storePart, "readwrite");
    let objectStore = transactionAdd.objectStore(storePart);
    
    for (var element of arrayPartidos) {
        objectStore.add(element);
    }
   
    
    transactionAdd.oncomplete = (event) => {
        console.log("Adicionou partidos no IndexDB");
    };

    transactionAdd.onerror = requestError;
};

//Função que vai exibir o nome do candidato na tela quando o número dele for digitado
const displayCandidato = () => {
    let transactionDisplay = db.transaction(storeCand, "readonly");
    let objectStore = transactionDisplay.objectStore(storeCand); 
    
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        
        if(numeroVotado===cursor.value.número) { //Se o numeroVotado(variável que armazena cada número pressionado pelo usuário) for igual ao valor do número de algum candidato ele exibe o nome do usuário
            const textItem = `${cursor.value.nome}`;
            nomeCandidato.textContent = textItem;
            nomeCandidato.appendChild;
            enabled();//Quando o número inserido da um número valido ele permite que o botão de confirmar seja pressionado
            return;
        }
        if(numeroVotado!==cursor.value.número){ //Caso não bata com nenhum valor do IndexDB ele exibe o candidato inexistente
            nomeCandidato.textContent="Candidato inexistente";
            nomeCandidato.appendChild;
            disabled(); //Quando o número inserido é inválido ele desabilita o botão de confirmar
        }
        cursor.continue(); 
    };
};

//Função que vai exibir o nome do partido na tela quando o número dele for digitado
const displayPartido = () => {
        
        let transactionDisplay = db.transaction(storePart, "readonly");
        let objectStore = transactionDisplay.objectStore(storePart); 
        
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            
            if(numeroVotado===cursor.value.número) { //Se o numeroVotado(variável que armazena cada número pressionado pelo usuário) for igual ao valor do número de algum partido ele exibe o nome do partido 
                const textItem = `${cursor.value.nome}`;
                nomePartido.textContent = textItem;
            
                nomePartido.appendChild;
                enabled();//Quando o número inserido da um número valido ele permite que o botão de confirmar seja pressionado
                return;
            }
            if(numeroVotado!==cursor.value.número){ //Caso não bata com nenhum valor do IndexDB ele exibe o partido inexistente
                nomePartido.textContent="Partido inexistente";
                nomePartido.appendChild;
                disabled();//Quando o número inserido é inválido ele desabilita o botão de confirmar
            }
            cursor.continue(); 
        };

};

//Variável de retorno e função que vai decidir se o voto no candidato vai vai ser armazenado no indexDB 
let booleanConfirmaCandidato = false;
function testesConfirmaCandidato() {
    booleanConfirmaCandidato = false;
    console.log("Chamou o testesConfirmaCandidato");
    if(inputs[3].value || numeroVotado === "branco") { //Se preencheu os 4 números ou apertou branco
        console.log("Passou no primeiro teste");
        if(!(nomePartido.textContent==="Partido inexistente")) { //Se não deu partido inexistente
            console.log("Passou no segundo teste");
            if(!(nomeCandidato.textContent==="Candidato inexistente") || numeroVotado === "branco") { //Se não deu candidato inexistente ou o usuário votou branco
                console.log("Passou no terceiro teste do testeConfirma");
                booleanConfirmaCandidato = true;
            }  
        }
    }
    return booleanConfirmaCandidato;
}

//Variável de retorno e função que vai decidir se o voto do partido vai vai ser armazenado no indexDB 
let booleanConfirmaPartido = false;
function testesConfirmaPartido() {
    booleanConfirmaPartido = false;
    console.log("Chamou o testesConfirmaPartido");
    if(inputs[1].value || mensagemBranco.textContent === "Branco") {
        console.log("Passou no primeiro teste");
        if(!(nomePartido.textContent==="Partido inexistente")) {
            console.log("Passou no segundo teste");
            if(nomeCandidato.textContent===""){
                console.log("Passou no terceiro teste do testeConfirmaPartido");
                booleanConfirmaPartido = true;
            }  
        }
    }
    return booleanConfirmaPartido;
}

//Variável que vai ser usada para limpeza da tela e função que vai armazenar o voto no candidato no indexDB
let booleanLimpeza = false;
const armazenarVotoCandidato = () => {
    booleanLimpeza = false;
    console.log("Chamou armazenar voto do candidato");
    if(testesConfirmaCandidato()) {
        console.log("Entrou no IF do ArmazenarVoto (testesConfirmaCandidato)");
        booleanLimpeza = true; 
        let votado; //Candidato que o usuário votou
        
        const transactionAdd = db.transaction(storeCand, "readwrite");
        let objectStore = transactionAdd.objectStore(storeCand);
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            console.log(cursor.value);
            if(numeroVotado===cursor.value.número) {        
                console.log("O númeroVotado bateu com um número de um objeto do IndexDB");
                
                votado = cursor.value;
                console.log("Objeto antes do voto |" + votado);
                votado.votos++;
                objectStore.put(votado);
                console.log("Objeto depois do voto |" + votado);       
                console.log("Acrescentou o voto no IndexDB");
                
                transactionAdd.oncomplete = messageConfirmado(); //Caso tenha dado tudo certo chama a função que vai exibir a mensagem de confirmação na tela
                transactionAdd.onerror = requestError;
                return;
            }
               cursor.continue();
        };
    }     
};

//Função que vai armazenar o voto no partido no IndexDB
function armazenarVotoPartido() {
    booleanLimpeza = false;
    console.log("Chamou armazenar voto do partido");
    if(testesConfirmaPartido()) {
        console.log("Entrou no IF do ArmazenarVoto (testesConfirmaPartido)");
        booleanLimpeza = true;
        let votado; //Partido que o usuário votou
        
        const transactionAdd = db.transaction(storePart, "readwrite");
        let objectStore = transactionAdd.objectStore(storePart);
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if(numeroVotado===cursor.value.número) {
                console.log("O númeroVotado bateu com um número de um objeto do IndexDB");
                
                votado = cursor.value;
                console.log("Objeto antes do voto |" + votado);
                votado.votos++;
                objectStore.put(votado);
                console.log("Objeto depois do voto |" + votado);
                console.log("Acrescentou o voto no IndexDB");
                
                transactionAdd.oncomplete = messageConfirmado(); //Caso tenha dado tudo certo chama a função que vai exibir a mensagem de confirmação na tela
                transactionAdd.onerror = requestError;
                return;
            }
               cursor.continue();
        };
    } 
}

//Função que vai executar a limpeza da tela depois de 2 segundos
function afterTwoSec() {
    console.log("Chamou o afterTwoSec");
    if(booleanLimpeza) { //O boolean que é modificado dentro do armazenarVoto quando ele é válido
        console.log("Entrou dentro do IF do afterTwoSec(booleanLimpeza=true)");
//        bemtevi();
        setTimeout(() => {
            limparNumeroArmazenado();
            limparNumeros();
            limparTexto();
            enabled(); //Deixa o confirma pressionável de novo
        },2000);
        booleanLimpeza = false; 
        return;
    }
    else {
        enabled(); //Deixa o confirma pressionável de novo
    }  
}

//Função que vai ser chamada no confirma pra decidir se o voto vai ser armazenado no partido ou nos candidatos
function whichArmazenarVoto() {
    if(inputs[1].value && !inputs[2].value && !inputs[3].value) { //Quando o usuário preencheu 2 números E não preencheu o terceiro número E não preencheu o quarto numero
        armazenarVotoPartido();
        return;
    }
    if(inputs[3].value || mensagemBranco.textContent==="Branco") { //Se o quarto digíto estiver preenchido
        armazenarVotoCandidato();
        return;
    }
}

//Evento de criação do IndexDB
window.addEventListener("load",createDB);


//Eventos do confirma
confirma.addEventListener("click",disabled);//Vem primeiro 
confirma.addEventListener("click",whichArmazenarVoto);
confirma.addEventListener("click",afterTwoSec);



function bemtevi() {
   var audio = new Audio("bemtevi.mpeg");
   audio.play();
}