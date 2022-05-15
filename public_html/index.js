let candidatos = document.getElementById("candidatosTBODY");

let partidos = document.getElementById("partidosTBODY");

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

let alexandreFrota = new candidato("Alexandre Frota", "1362", "Partido dos trabalhadores",10);
let arthurLira = new candidato("Arthur Lira", "1311", "Partido dos trabalhadores",1);
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

let pt = new partido("Partido dos trabalhadores","PT","13", 20);
let rede = new partido ("Rede sustentabilidade", "REDE", "18", 15);
let pdt = new partido ("Partido Democrático Trabalhista","PDT","12",0);
let arrayPartidos =[pt, rede, pdt];

const dbName = "Urna";
let db;

const storeCand = "Candidatos";
const storePart = "Partidos";
function requestError (event) {
    console.error("Error", event.target.error);
}


const createDB = () => {
    if(window.indexedDB) {
        const request = window.indexedDB.open(dbName,1);
        request.onerror = (event) => {
            console.log("on error",event);
        };
        
        request.onsuccess = (event) => {
            db = request.result;
            console.log("on success");
            addCandidatosIndexDB();
            addPartidosIndexDB();
            appendCandidato();
            appendPartido();
        };
        
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            let objectStoreCandidatos = db.createObjectStore(storeCand,{keyPath:"número"});
            let objectStorePartidos = db.createObjectStore(storePart,{keyPath:'número'});      
            console.log("on upgraded", event);
        };
    }  
};

const addCandidatosIndexDB = () => {
    
    const transactionAdd = db.transaction(storeCand, "readwrite");
    const objectStore = transactionAdd.objectStore(storeCand);
    
    for (var element of arrayCandidatos) {
        objectStore.add(element);
    }
    
    transactionAdd.oncomplete = (event) => {
        console.log("transação concluída");
    };
    
    transactionAdd.onerror = requestError;
 
};

const addPartidosIndexDB = () => {
    const transactionAdd = db.transaction(storePart, "readwrite");
    let objectStore = transactionAdd.objectStore(storePart);
    
    for (var element of arrayPartidos) {
        objectStore.add(element);
    }
   
    
    transactionAdd.oncomplete = (event) => {
        console.log("transação concluída");
    };

    transactionAdd.onerror = requestError;
};

let arrayDeputado = [];

const appendCandidato = () => {
    
    console.log("Chamou appendCandidato");
    let deputado;
    const transactionAdd = db.transaction(storeCand, "readonly");
    let objectStore = transactionAdd.objectStore(storeCand);
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if(cursor) {
            console.log(cursor.value);
            deputado=cursor.value;

                let tr = document.createElement("tr");
                let tdNome = document.createElement("td");
                let tdNúmero = document.createElement("td");
                let tdVotos = document.createElement("td");
                tdNome.innerText = deputado.nome;
                tdNúmero.innerText = deputado.número;
                tdVotos.innerText = deputado.votos;
                tr.appendChild(tdNome);
                tr.appendChild(tdNúmero);
                tr.appendChild(tdVotos);
                candidatos.appendChild(tr);

                console.log(deputado.nome);
                console.log(deputado.número);
                console.log(deputado.votos);              
        }
        
    transactionAdd.oncomplete = () => {
        console.log("Deu certo");
    };
    transactionAdd.onerror = requestError;
    cursor.continue();
               
   };
};

const appendPartido = () => {
    
    console.log("Chamou appendPartido");
    let partido;
    const transactionAdd = db.transaction(storePart, "readonly");
    let objectStore = transactionAdd.objectStore(storePart);
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if(cursor) {
            console.log(cursor.value);
            partido=cursor.value;

                let tr = document.createElement("tr");
                let tdNome = document.createElement("td");
                let tdSigla = document.createElement("td");
                let tdNúmero = document.createElement("td");
                let tdVotos = document.createElement("td");
                tdNome.innerText = partido.nome;
                tdSigla.innerText = partido.sigla;
                tdNúmero.innerText = partido.número;
                tdVotos.innerText = partido.votos;
                tr.appendChild(tdNome);
                tr.appendChild(tdSigla);
                tr.appendChild(tdNúmero);
                tr.appendChild(tdVotos);
                partidos.appendChild(tr);
 
        }
        
        transactionAdd.oncomplete = () => {
            console.log("Deu certo");
        };
        transactionAdd.onerror = requestError;
    
        cursor.continue();          
   };
};

window.addEventListener("load",createDB);
