/************************************** CRIAR TABELA ***************************************/

/* BEGIN MAIN */

const dataframe = {
    'nome': ['Lucas', 'Gabriel', 'Vitor', 'Luana', 'Valcira'],
    'idade': [17, 21, 15, 13, 37],
    'nota': [10, 7, 6, 8, 5] 
};


doTable(dataframe);


/* END MAIN */




/*  BEGIN FUNCTION PRIMARY  */

function doTable(df,seletor="body",inDiv=true) {
    const rows = getMost(df);


    putTags(local=seletor,hasDiv=inDiv);

    CreateRow(rows);

    SetHeaders(df);

    AddItens(df,rows);

}

/*  END FUNCTION PRIMARY  */




/*  BEGIN FUNCTIONS SECONDARY  */


function putTags(local, hasDiv){
    if(hasDiv){
        document.querySelector(local).innerHTML += `<div class="tbDiv"></div>`;
        document.querySelector(".tbDiv").innerHTML = `<table class="js_tb"><tbody></tbody></table>`;
    }else{
        document.querySelector(local).innerHTML += `<table class="js_tb"><tbody></tbody></table>`;
    };
    AddStylePage([ [".js_tb tbody tr td,th","border: 2px solid black;width:100px;text-align:center;font-size:1.5em;cursor: default"],[".js_tb tbody tr th","font-size:1.8em;cursor: pointer"]]);
    
};


function CreateRow(line) {
    for(let i=0;i<=line;i++){
        document.querySelector(".js_tb tbody").innerHTML += `<tr class="row${i}"></tr>`;
    };
};


function SetHeaders(object){
    Object.keys(object).forEach( (property,col) => {
        document.querySelector(".js_tb tbody .row0").innerHTML += `<th class="col${col}"> ${property} </th>`;
    } );        
};


function AddItens(object,line){
    for (let i = 1; i<=line; i++) {
        Object.keys(object).forEach( (property,col) => {
            document.querySelector(`.row${i}`).innerHTML += `<td class="col${col}"> ${object[property][i-1]} </td>`;
        });
    };
};


function AddStylePage(dicionario=[]){
    if (!(dicionario==[])){
        dicionario.forEach( (e) => {
            if (e.length!=2){
                exception(); 
            }else{
                estiliza(e[0],e[1]);
            };
        } );
    }else{
        exception();
    };
};


/*  END FUNCTIONS SECONDARY  */



/*  BEGIN FUNCTIONS SUPORT   */

function getMost(object){
    let maior = 0;
    Object.keys(object).forEach((e) => {
        if (e.length>maior) maior = e.length;
    });
    return maior;
};

function estiliza(seletor,property){
    if(document.querySelectorAll("head style").length===0){
        document.querySelector("head").innerHTML += `<style></style>`;
    };
    document.querySelector("head style").innerHTML += 
    `
    
    ${seletor}{${property}}
    `; 
};
       
function exception() {
    alert("Error!!!");
}


/*  END FUNCTIONS SUPORT   */


/************************************** ORDENAR TABELA ***************************************/


/* BEGIN MAIN */

const buttons = document.querySelectorAll(".js_tb tbody .row0 th");
buttons.forEach( (e,i) => {
    e.addEventListener('click', () => ordena(buttons.length,i));   
} );

/* END MAIN */


/*  BEGIN FUNCTION PRIMARY */

function ordena(contCol,alvo){
    let listOrdena = getDfList(contCol);
    ordenaCresc(listOrdena,alvo);
};

/*  END FUNCTION PRIMARY  */


/*  BEGIN FUNCTIONS SECONDARY  */

function ordenaCresc(list,alvo){
    for(let i=0;i<list[alvo].length;i++){
        for(let j=0;j<list[alvo].length;j++){
            if( converte(list[alvo][i]) < converte(list[alvo][j]) ){
                list = mudaPos(list, i, j);            
            };
        };
    };
    return list;
};


function mudaPos(list, i, j) {
    for(let sel=0;sel<list.length;sel++){
        let aux = converte(list[sel][j]);
        list[sel][j].innerText = converte(list[sel][i]);
        list[sel][i].innerText = aux;
    };
    return list;
}


function getDfList(col){
    let Flist = [];
    for(let i=0;i<col;i++){
        Flist[i] = document.querySelectorAll(`.js_tb tbody tr td.col${i}`);
    };
    return Flist;
};

function converte(item){
    let aux;
    if(!isNaN(item.innerText)){
        aux = parseFloat(parseFloat(item.innerText).toFixed(2)) ;
    }else{
        aux = item.innerText;
    };
    return aux;
};
/*  BEGIN FUNCTIONS SECONDARY  */


/*  BEGIN FUNCTIONS SUPORT   */

function mostraNodeLista(list,tam,bool){
    if(bool){
        list.forEach( (coluna, index) => {
            console.log("col: "+index);
            coluna.forEach( (itens, i) => {
                console.log("row: "+(i+1)+" item: "+itens.innerText);
            } );
        } );
    }else{
        for(let row=0;row<getMost(dataframe);row++) {
            console.log("row: "+(row+1));
            for(let col=0;col<tam;col++){
                console.log("col: "+(col+1)+" item: "+list[col][row].innerText);
            };       
        };
    };
        
};

/*  END FUNCTIONS SUPORT   */