window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
if(localStorage.getItem("token")){
    
    headers = {
        headers: {
        'Authorization': "bearer " + localStorage.getItem("token")
        }
    }
    
    loadSumaMichoacan();
    loadSumaNayarit();

    
    

   document.querySelector('.btnCerrar').addEventListener('click', borrarToken); 
   
   document.querySelector(".btnEnviar").addEventListener('click', function(){ 
        let J = document.getElementById('J').value;
        let K = document.getElementById('K').value;
        let M = document.getElementById('M').value;
        let V = document.getElementById('cars').value;
        if((J >= 1 && J<= 9)&&(K >= 1 && K<= 9)&&(M >= 1 && M<= 9)&&(V != 'select')){
            loadTotalMichoacan(J,K,M,V); 
        }else{
            window.alert("Datos ingresados incorrectamtente");
            location.reload();
        }})

   
   
}
else{
    window.location.href = "index.html";
  }
} 
function genera_tabla(V,MP,Periodo,Frecuencia,Pronostico1,Pronostico2,estado) {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];
  
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    var hilera = document.createElement("tr");
    var celda = document.createElement("td");

    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("Periodo " + estado);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("Frecuencia");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("Pronostico seleccionado "+V);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("Mejor pronostico "+MP);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);

    tblBody.appendChild(hilera);
    // Crea las celdas
    for (var i = 0; i < 101; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");
      var celda = document.createElement("td");

      for (var j = 0; j < 4; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        if(j == 0){
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(Periodo[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        if(j == 1){
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(Frecuencia[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        if(j == 2){
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(Pronostico1[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        if(j == 3){
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(Pronostico2[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        
      }
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }
  
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    var mybr = document.createElement('br');
    body.appendChild(document.createElement('br'));
    body.appendChild(document.createElement('br'));
    body.appendChild(document.createElement('br'))
    body.appendChild(document.createElement('br'))
    body.appendChild(document.createElement('br'))
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");


    
    
  }
  
function borrarToken() {
    localStorage.clear();
    location.reload();
}

function loadSumaMichoacan() {
    axios.get(url + "/michoacan", headers)
    .then(function(res) {
        //console.log(res.data.message);
        document.querySelector(".michoacan").innerHTML = res.data.message[0]["SUM(Frecuencia)"];
    }).catch(function(err) {
        console.log(err);  
    })
}
function loadSumaNayarit() {
    axios.get(url + "/nayarit", headers)
    .then(function(res) {
        //console.log(res);
        document.querySelector(".nayarit").innerHTML = res.data.message[0]["SUM(Frecuencia)"];
    }).catch(function(err) {
        console.log(err);  
    })
}

async function loadTotalMichoacan(J,K,M,V) {

    //Llamadas
    const result3 = await axios.get(url + "/michoacan", headers)   
    const sumaMichoacan= result3.data.message[0]["SUM(Frecuencia)"];

    const result4 = await axios.get(url + "/nayarit", headers)   
    const sumaNayarit= result4.data.message[0]["SUM(Frecuencia)"];

    const result1 = await axios.get(url + "/michoacan/all", headers)   
    const FreMichoacan= result1.data

    const result2 = await axios.get(url + "/nayarit/all", headers)
    const FreNayarit = result2.data

    //Grafica de las 2 frecuencias
    const datos =  new Array
    const datos1 =  new Array
    const meses =  new Array
    let i=0;
    for (let index = 0; index < 100;) {
        datos[i] = FreMichoacan.message[index].Frecuencia;
        datos1[i] = FreNayarit.message[index].Frecuencia;
        meses[i] = FreMichoacan.message[index].Periodo;
        i++;
        index=index+10;
    }

    document.querySelector("#grafica").innerHTML = 'Grafica de las frecuencias sobre homicidios en Nayarit Y Michoacan'
    document.querySelector("#Patron1").innerHTML = 'Nayarit tiene un tendencia ligeramente hacia la baja con algunos picos en el año 2018 pero se mantiene siempre en un rango '
    document.querySelector("#Patron2").innerHTML = 'Michoacan tiene una tendencia a la alta, con algunos bajones pero regularmente recupera la tendencia a la alta'
    console.log(datos)
    console.log(datos1)
    new Chart("myChart", {
        type: "line",
        data: {
            labels: meses,
            datasets: [{
                data: datos,
                label: "Michoacan",
                borderColor: "red",
                fill: false
                },
                {
                data: datos1,
                label: "Nayarit",
                borderColor: "green",
                fill: false
                }]
              },
            options: {
                title: {
                    display: true,
                    text: 'Homicidios en Nayarit y Michoacan'
                  }
            }
            });
            

            var xValues = ["Homicidios Michoacan", "Homicidios Nayarit"];
            var yValues = [sumaMichoacan, sumaNayarit];
            var barColors = [
              "red",
              "green"
            ];
            
            new Chart("myChartPie", {
              type: "pie",
              data: {
                labels: xValues,
                datasets: [{
                  backgroundColor: barColors,
                  data: yValues
                }]
              },
              options: {
                title: {
                  display: true,
                  text: "Relacion de Homicidios en Nayarit y Michoacans"
                }
              }
            });

            

            
            //calculo de la diferencia
    let diferencia=0
    let porcentaje=0
    porcentaje= (100/(sumaNayarit))*sumaMichoacan
    diferencia = (sumaMichoacan - sumaNayarit)/100     
    document.querySelector("#Diferencia").innerHTML = 'La diferencia promedio de cada mes entre Nayarit y Michoacan es de ' + Number(diferencia.toFixed(0))+ ' homicidios'
    document.querySelector("#Porcentaje").innerHTML = 'Michoacan tiene ' + Number(porcentaje.toFixed(2))+ '% mas homicidios en el periodo'

    //PS
    const psNayarit = [];   
    const psMichoacan = [];
    let sumaPsMichoacan=0;
    let sumaPsNayarit=0;
    for (i = 1; i < 101;i++){
        sumaPsMichoacan+= FreMichoacan.message[i-1].Frecuencia;
        sumaPsNayarit=sumaPsNayarit+ FreNayarit.message[i-1].Frecuencia;
        psMichoacan[i] = sumaPsMichoacan/i;
        psNayarit[i] = sumaPsNayarit/i;
    }
    console.log(psMichoacan)
    //Error PS
    let psErrorMichoacan = 0;
    let psErrorNayarit = 0
    for (i = 1 ;i < 100; i++) {
        psErrorMichoacan+= Math.abs(psMichoacan[i] - FreMichoacan.message[i].Frecuencia)
        psErrorNayarit+=Math.abs(psNayarit[i] - FreNayarit.message[i].Frecuencia)
    }
    psErrorMichoacan=psErrorMichoacan/99
    psErrorNayarit=psErrorNayarit/99

    //PMS
    const pmsMichoacan = []
    const pmsNayarit = []
    let sumaPmsMichoacan = 0
    let sumaPmsNayarit = 0
    for ( i = K;  i< 101; i++){
        sumaPmsMichoacan = 0
        sumaPmsNayarit = 0
        for (let jj = 1; jj <= K; jj++){
            sumaPmsMichoacan += FreMichoacan.message[i-jj].Frecuencia
            sumaPmsNayarit +=FreNayarit.message[i-jj].Frecuencia     
        }
        pmsMichoacan[i] = (sumaPmsMichoacan/K)
        pmsNayarit[i] = (sumaPmsNayarit/K)
    }
    console.log(pmsMichoacan)
    console.log(pmsNayarit)
            


    //Error PMS
    let pmsErrorMichoacan = 0;
    let pmsErrorNayarit = 0
    for (i = K;i < 100; i++) {
        pmsErrorMichoacan+= Math.abs(pmsMichoacan[i] - FreMichoacan.message[i].Frecuencia);
        pmsErrorNayarit+=Math.abs(pmsNayarit[i] - FreNayarit.message[i].Frecuencia);
    }
    pmsErrorMichoacan=pmsErrorMichoacan/(100-K)
    pmsErrorNayarit=pmsErrorNayarit/(100-K)

    //PMD
    const pmdMichoacan = []
    const pmdNayarit = []
    let sumaPmdMichoacan = 0
    let sumaPmdNayarit = 0
    
    for ( i = Number(J)+Number(K);  i< 101; i++){
        sumaPmdMichoacan = 0
        sumaPmdNayarit = 0
        for (let jj = 1; jj <= J; jj++){
            sumaPmdMichoacan += pmsMichoacan[i-jj]
            sumaPmdNayarit += pmsNayarit[i-jj]     
        }
        pmdMichoacan[i] = (sumaPmdMichoacan/J)
        pmdNayarit[i] = (sumaPmdNayarit/J)
    }
    console.log(pmdMichoacan)
    //Error PMD
    let pmdErrorMichoacan = 0;
    let pmdErrorNayarit = 0
    for (i = Number(J)+Number(K);i < 100; i++) {
        pmdErrorMichoacan+= Math.abs(pmdMichoacan[i] - FreMichoacan.message[i].Frecuencia)
        pmdErrorNayarit+=Math.abs(pmdNayarit[i] - FreNayarit.message[i].Frecuencia)
    }
    pmdErrorMichoacan=pmdErrorMichoacan/(100-J)
    pmdErrorNayarit=pmdErrorNayarit/(100-J)

    console.log(pmdMichoacan)


    //PMDA
    const pmdaMichoacan = []
    const pmdaNayarit = []

    let Am = 0
    let Bm = 0
    let An = 0
    let Bn = 0

    for ( i = Number(J)+Number(K);  i< 101; i++){
        Am = ((2*pmsMichoacan[i])-pmdMichoacan[i]);
        Bm = ((2*Math.abs(pmsMichoacan[i])-pmdMichoacan[i])/99);
        An = ((2*pmsNayarit[i])-pmdNayarit[i]);
        Bn = ((2*Math.abs(pmsNayarit[i])-pmdNayarit[i])/99);
        pmdaMichoacan[i] = Am+(Bm*M)
        pmdaNayarit[i] = An+(Bn*M)
    }
    console.log(pmdaMichoacan)

    //Error PMDA
    let pmdaErrorMichoacan = 0;
    let pmdaErrorNayarit = 0
    for (i =  K+J;i < 100; i++) {
        pmdaErrorMichoacan+= Math.abs(pmdaMichoacan[i] - FreMichoacan.message[i].Frecuencia)
        pmdaErrorNayarit+=Math.abs(pmdaNayarit[i] - FreNayarit.message[i].Frecuencia)
    }
    pmdaErrorMichoacan=pmdaErrorMichoacan/(100-(Number(J)+Number(K)))
    pmdaErrorNayarit=pmdaErrorNayarit/(100-(Number(J)+Number(K)))
    console.log(pmdaErrorMichoacan)


    //PTMAC
    const tmacM = []
    const tmacN = []
    const PtmacM = []
    const PtmacN = []
    for (i = 1; i < 100; i++) {
        tmacM[i] = ((FreMichoacan.message[i].Frecuencia/FreMichoacan.message[i-1].Frecuencia)*100)
        tmacN[i] = ((FreNayarit.message[i].Frecuencia/FreNayarit.message[i-1].Frecuencia)*100)
    }
    for (i = 2; i < 100; i++) {
        PtmacM[i] = ((tmacM[i-1]/100)*FreMichoacan.message[i-1].Frecuencia+FreMichoacan.message[i].Frecuencia)
        PtmacN[i] = ((tmacN[i-1]/100)*FreNayarit.message[i-1].Frecuencia+FreNayarit.message[i].Frecuencia)
    }

    //Error PTMAC
    let ptmacErrorMichoacan = 0;
    let ptmacErrorNayarit = 0
    for (i =  2;i < 100; i++) {
        ptmacErrorMichoacan+= Math.abs(PtmacM[i] - FreMichoacan.message[i].Frecuencia)
        ptmacErrorNayarit+=Math.abs(PtmacN[i] - FreNayarit.message[i].Frecuencia)
    }
    pmdaErrorMichoacan=pmdaErrorMichoacan/(98)
    pmdaErrorNayarit=pmdaErrorNayarit/(98)

    //Asignacion periodo para graficas 
    const Periodo =  new Array
    const PeriodoCompleto =  new Array
    const FCompletaMichoacan =  new Array
    const FCompletaNayarit =  new Array
    for (let index = 0; index < 100;index++) {
        PeriodoCompleto[index] = FreMichoacan.message[index].Periodo;
        FCompletaMichoacan[index] = FreMichoacan.message[index].Frecuencia;
        FCompletaNayarit[index] = FreNayarit.message[index].Frecuencia;
    } 
    for (let index = 0; index < 100;index+=1) {
        Periodo[index] = FreMichoacan.message[index].Periodo;
    }
    Periodo.push('Julio_2021');
    //Pronostico seleccionado
    let MP = ''

    let seleccionadoM = []
    let seleccionadoN = []
    switch (V) {
        case 'PS':
            seleccionadoM = psMichoacan
            seleccionadoN = psNayarit
            document.querySelector("#Pronostico").innerHTML = 'Pronostico seleccionado: PS'
            document.querySelector("#PronosticoResultadoM").innerHTML = "Resultado esperado en Michoacan el siguiente mes: " + Number(psMichoacan[100].toFixed(2));
            document.querySelector("#PronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(psNayarit[100].toFixed(2));
            document.querySelector("#errorMedioM").innerHTML = "Error medio Michoacan: " + Number(psErrorMichoacan.toFixed(2));
            document.querySelector("#errorMedioN").innerHTML = "Error medio Nayarit: " + Number(psErrorNayarit.toFixed(2));
                new Chart("myChart1", {
                    type: "line",
                    data: {
                        labels: Periodo,
                        datasets: [{
                        data: psMichoacan,
                        label: "Michoacan",
                        borderColor: "red",
                        fill: false
                        },{
                        data: psNayarit,
                        label: "Nayarit",
                        borderColor: "green",
                        fill: false
                        }]
                    },
                    options: {
                        
                        title: {
                            display: true,
                            text: "Homicidios en Nayarit y Michoacan " + V
                        }
                    }
                    });
            break;

        case 'PMS':
            seleccionadoM = pmsMichoacan
            seleccionadoN = pmsNayarit
            document.querySelector("#Pronostico").innerHTML = 'Pronostico seleccionado: PMS'
            document.querySelector("#PronosticoResultadoM").innerHTML = "Resultado esperado en Michoacan en el siguiente mes: " + Number(pmsMichoacan[100].toFixed(2));
            document.querySelector("#PronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(pmsNayarit[100].toFixed(2));
            document.querySelector("#errorMedioM").innerHTML = "Error medio Michoacan: " + Number(pmsErrorMichoacan.toFixed(2));
            document.querySelector("#errorMedioN").innerHTML = "Error medio Nayarit: " + Number(pmsErrorNayarit.toFixed(2));
            new Chart("myChart1", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: pmsMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: pmsNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: "Homicidios en Nayarit y Michoacan " + V
                    }
                }
                });
            break;

        case 'PMD':
            seleccionadoM = pmdMichoacan
            seleccionadoN = pmdNayarit
            document.querySelector("#Pronostico").innerHTML = 'Pronostico seleccionado: PMD'
            document.querySelector("#errorMedioM").innerHTML = "Error medio Michoacan: " + Number(pmdErrorMichoacan.toFixed(2));
            document.querySelector("#errorMedioN").innerHTML = "Error medio Nayarit: " + Number(pmdErrorNayarit.toFixed(2));
            document.querySelector("#PronosticoResultadoM").innerHTML = "Resultado esperado en Michoacanel siguiente mes: " + Number(pmdMichoacan[100].toFixed(2));
            document.querySelector("#PronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(pmdNayarit[100].toFixed(2));
            new Chart("myChart1", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: pmdMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: pmdNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: "Homicidios en Nayarit y Michoacan " + V
                    }
                }
                });
            break;

        case 'PMDA':
            seleccionadoM = pmdMichoacan
            seleccionadoN = pmdNayarit
            document.querySelector("#Pronostico").innerHTML = 'Pronostico seleccionado: PMDA'
            document.querySelector("#errorMedioM").innerHTML = "Error medio Michoacan: " + Number(pmdaErrorMichoacan.toFixed(2));
            document.querySelector("#errorMedioN").innerHTML = "Error medio Nayarit: " + Number(pmdaErrorNayarit.toFixed(2));
            document.querySelector("#PronosticoResultadoM").innerHTML = "Resultado esperado en Michoacan el siguiente mes: " + Number(pmdaMichoacan[100].toFixed(2));
            document.querySelector("#PronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(pmdaNayarit[100].toFixed(2));
            new Chart("myChart1", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: pmdaMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: pmdaNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: "Homicidios en Nayarit y Michoacan " + V
                    }
                }
                });
            break;

        case 'PTMAC':
            seleccionadoM = PtmacM
            seleccionadoN = PtmacN
            document.querySelector("#Pronostico").innerHTML = 'Pronostico seleccionado: PTMAC'
            document.querySelector("#errorMedioM").innerHTML = "Error medio Michoacan: " + Number(ptmacErrorMichoacan.toFixed(2));
            document.querySelector("#errorMedioN").innerHTML = "Error medio Nayarit: " + Number(ptmacErrorNayarit.toFixed(2));
            document.querySelector("#PronosticoResultadoM").innerHTML = "Resultado esperado en Michoacan el siguiente mes: " + Number(PtmacM[99].toFixed(2));
            document.querySelector("#PronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(PtmacN[99].toFixed(2));
            new Chart("myChart1", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: PtmacM,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: PtmacN,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: "Homicidios en Nayarit y Michoacan " + V +" " 
                    }
                }
                });
            break;
    
        default:

            break;
    }

    const erroresMediosMichoacan= [psErrorMichoacan,pmsErrorMichoacan,pmdErrorMichoacan,pmdaErrorMichoacan,ptmacErrorMichoacan]
        
    let a =0
    for ( i = 1; i < 5 ;i++) {
        if(erroresMediosMichoacan[a] > erroresMediosMichoacan[i])
        {
            a++
            i= -1
        }
    }
    let mejorPronosticoM = []
    let mejorPronosticoN = []
    switch (a) {
        case 0:
            
            mejorPronosticoM = psMichoacan
            mejorPronosticoN = psNayarit
            MP = 'PS'
            document.querySelector("#mejorPronostico").innerHTML = 'Mejor pronostico: PS'
            document.querySelector("#errorMejorM").innerHTML = "Error medio Michoacan: " + Number(psErrorMichoacan.toFixed(2));
            document.querySelector("#errorMejorN").innerHTML = "Error medio Nayarit: " + Number(psErrorNayarit.toFixed(2));
            document.querySelector("#mejorPronosticoResultadoM").innerHTML = "Resultado esperado en Michoacan el siguiente mes: " + Number(psMichoacan[100].toFixed(2));
            document.querySelector("#mejorPronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(psNayarit[100].toFixed(2));
            new Chart("myChart2", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: psMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: psNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: 'Homicidios en Nayarit y Michoacan de mejor pronostico PS'
                    }
                }
                });

                new Chart("myChartBar", {
                    type: 'line',
                    data: {
                        labels: Periodo,
                        datasets: [{
                        data: FCompletaNayarit,
                        label: "Frecuencia Nayarit",
                        backgroundColor: "red",
                        borderColor:"red",
                        fill: true
                        },{
                        data: psNayarit,
                        label: " PS Nayarit",
                        backgroundColor: "green",
                        borderColor:"green",
                        fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                        },
                        tooltip: {
                            mode: 'index'
                        },
                        },
                        interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                        },
                        scales: {
                        x: {
                            title: {
                            display: true,
                            text: 'Month'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                            display: true,
                            text: 'Value'
                            }
                        }
                        }
                    }
                    });
                    new Chart("myChartBar1", {
                        type: 'line',
                        data: {
                            labels: Periodo,
                            datasets: [{
                            data: FCompletaMichoacan,
                            label: "Frecuencia Michoacan",
                            backgroundColor: "red",
                            borderColor:"red",
                            fill: true
                            },{
                            data: psMichoacan,
                            label: "PS Michoacan",
                            backgroundColor: "green",
                            borderColor:"green",
                            fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                            title: {
                                display: true,
                                text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                            },
                            tooltip: {
                                mode: 'index'
                            },
                            },
                            interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                            },
                            scales: {
                            x: {
                                title: {
                                display: true,
                                text: 'Month'
                                }
                            },
                            y: {
                                stacked: true,
                                title: {
                                display: true,
                                text: 'Value'
                                }
                            }
                            }
                        }
                        });
            break;
        case 1:
            mejorPronosticoM = pmsMichoacan
            mejorPronosticoN = pmsNayarit
            MP = 'PMS'
            document.querySelector("#mejorPronostico").innerHTML = 'Mejor pronostico: PMS'
            document.querySelector("#errorMejorM").innerHTML = "Error medio Michoacan: " + Number(pmsErrorMichoacan.toFixed(2));
            document.querySelector("#errorMejorN").innerHTML = "Error medio Nayarit: " + Number(pmsErrorNayarit.toFixed(2));
            document.querySelector("#mejorPronosticoResultadoM").innerHTML = "Resultado esperado Michoacan en el siguiente mes: " + Number(pmsMichoacan[100].toFixed(2));
            document.querySelector("#mejorPronosticoResultadoN").innerHTML = "Resultado esperado Nayarit en el siguiente mes: " + Number(pmsNayarit[100].toFixed(2));
            new Chart("myChart2", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: pmsMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: pmsNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: 'Homicidios en Nayarit y Michoacan mejor pronostico PMS'
                    }
                }
                });
                new Chart("myChartBar", {
                    type: 'line',
                    data: {
                        labels: Periodo,
                        datasets: [{
                        data: FCompletaNayarit,
                        label: "Frecuencia Nayarit",
                        backgroundColor: "red",
                        borderColor:"red",
                        fill: true
                        },{
                        data: pmsNayarit,
                        label: "PMS Nayarit",
                        backgroundColor: "green",
                        borderColor:"green",
                        fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                        },
                        tooltip: {
                            mode: 'index'
                        },
                        },
                        interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                        },
                        scales: {
                        x: {
                            title: {
                            display: true,
                            text: 'Month'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                            display: true,
                            text: 'Value'
                            }
                        }
                        }
                    }
                    });
                    new Chart("myChartBar1", {
                        type: 'line',
                        data: {
                            labels: Periodo,
                            datasets: [{
                            data: FCompletaMichoacan,
                            label: "Frecuencia Michoacan",
                            backgroundColor: "red",
                            borderColor:"red",
                            fill: true
                            },{
                            data: pmsMichoacan,
                            label: "PMS Michoacan",
                            backgroundColor: "green",
                            borderColor:"green",
                            fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                            title: {
                                display: true,
                                text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                            },
                            tooltip: {
                                mode: 'index'
                            },
                            },
                            interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                            },
                            scales: {
                            x: {
                                title: {
                                display: true,
                                text: 'Month'
                                }
                            },
                            y: {
                                stacked: true,
                                title: {
                                display: true,
                                text: 'Value'
                                }
                            }
                            }
                        }
                        });
            break;
        case 2:
            MP = 'PMD'
            mejorPronosticoM = pmdMichoacan
            mejorPronosticoN = pmdNayarit
            document.querySelector("#mejorPronostico").innerHTML = 'Mejor pronostico: PMD'
            document.querySelector("#errorMejorM").innerHTML = "Error medio Michoacan: " + Number(pmdErrorMichoacan.toFixed(2));
            document.querySelector("#errorMejorN").innerHTML = "Error medio Nayarit: " + Number(pmdErrorNayarit.toFixed(2));
            document.querySelector("#mejorPronosticoResultadoM").innerHTML = "Resultado esperado Michoacanen el siguiente mes: " + Number(pmdMichoacan[100].toFixed(2));
            document.querySelector("#mejorPronosticoResultadoN").innerHTML = "Resultado esperado Nayarit en el siguiente mes: " + Number(pmdNayarit[100].toFixed(2));
            new Chart("myChart2", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: pmdMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: pmdNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: 'Homicidios en Nayarit y Michoacan mejor pronostico PMD'
                    }
                }
                });
                new Chart("myChartBar", {
                    type: 'line',
                    data: {
                        labels: Periodo,
                        datasets: [{
                        data: FCompletaNayarit,
                        label: "Frecuencia Nayarit",
                        backgroundColor: "red",
                        borderColor:"red",
                        fill: true
                        },{
                        data: pmdNayarit,
                        label: "PMD Nayarit",
                        backgroundColor: "green",
                        borderColor:"green",
                        fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                        },
                        tooltip: {
                            mode: 'index'
                        },
                        },
                        interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                        },
                        scales: {
                        x: {
                            title: {
                            display: true,
                            text: 'Month'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                            display: true,
                            text: 'Value'
                            }
                        }
                        }
                    }
                    });
                    new Chart("myChartBar1", {
                        type: 'line',
                        data: {
                            labels: Periodo,
                            datasets: [{
                            data: FCompletaMichoacan,
                            label: "Frecuencia Michoacan",
                            backgroundColor: "red",
                            borderColor:"red",
                            fill: true
                            },{
                            data: pmdMichoacan,
                            label: " PMD Michoacan",
                            backgroundColor: "green",
                            borderColor:"green",
                            fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                            title: {
                                display: true,
                                text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                            },
                            tooltip: {
                                mode: 'index'
                            },
                            },
                            interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                            },
                            scales: {
                            x: {
                                title: {
                                display: true,
                                text: 'Month'
                                }
                            },
                            y: {
                                stacked: true,
                                title: {
                                display: true,
                                text: 'Value'
                                }
                            }
                            }
                        }
                        });
            break;
        case 3:
            MP = 'PMDA'
            mejorPronosticoM = pmdaMichoacan
            mejorPronosticoN = pmdaNayarit
            document.querySelector("#mejorPronostico").innerHTML = 'Mejor pronostico: PMDA'
            document.querySelector("#errorMejorM").innerHTML = "Error medio Michoacan: " + Number(pmdaErrorMichoacan.toFixed(2));
            document.querySelector("#errorMejorN").innerHTML = "Error medio Nayarit: " + Number(pmdaErrorNayarit.toFixed(2));
            document.querySelector("#mejorPronosticoResultadoM").innerHTML = "Resultado esperado en Michoacan el siguiente mes: " + Number(pmdaMichoacan[100].toFixed(2));
            document.querySelector("#mejorPronosticoResultadoN").innerHTML = "Resultado esperado en Nayarit el siguiente mes: " + Number(pmdaNayarit[100].toFixed(2));
            new Chart("myChart2", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: pmdaMichoacan,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: pmdaNayarit,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: 'Homicidios en Nayarit y Michoacan mejor pronostico PMDA'
                    }
                }
                });
                new Chart("myChartBar", {
                    type: 'line',
                    data: {
                        labels: Periodo,
                        datasets: [{
                        data: FCompletaNayarit,
                        label: "Frecuencia Nayarit",
                        backgroundColor: "red",
                        borderColor:"red",
                        fill: true
                        },{
                        data: pmdaNayarit,
                        label: "PMDA Nayarit",
                        backgroundColor: "green",
                        borderColor:"green",
                        fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                        },
                        tooltip: {
                            mode: 'index'
                        },
                        },
                        interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                        },
                        scales: {
                        x: {
                            title: {
                            display: true,
                            text: 'Month'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                            display: true,
                            text: 'Value'
                            }
                        }
                        }
                    }
                    });
                    new Chart("myChartBar1", {
                        type: 'line',
                        data: {
                            labels: Periodo,
                            datasets: [{
                            data: FCompletaMichoacan,
                            label: "Frecuencia Michoacan",
                            backgroundColor: "red",
                            borderColor:"red",
                            fill: true
                            },{
                            data: pmdaMichoacan,
                            label: " PMDA Michoacan",
                            backgroundColor: "green",
                            borderColor:"green",
                            fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                            title: {
                                display: true,
                                text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                            },
                            tooltip: {
                                mode: 'index'
                            },
                            },
                            interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                            },
                            scales: {
                            x: {
                                title: {
                                display: true,
                                text: 'Month'
                                }
                            },
                            y: {
                                stacked: true,
                                title: {
                                display: true,
                                text: 'Value'
                                }
                            }
                            }
                        }
                        });
            break;
        case 4:
            MP = 'PTMAC'
            mejorPronosticoM = PtmacM
            mejorPronosticoN = PtmacN
            document.querySelector("#mejorPronostico").innerHTML = 'Mejor pronostico: PTMAC'
            document.querySelector("#errorMejorM").innerHTML = "Error medio Michoacan: " + Number(ptmacErrorMichoacan.toFixed(2));
            document.querySelector("#errorMejorN").innerHTML = "Error medio Nayarit: " + Number(ptmacErrorNayarit.toFixed(2));
            document.querySelector("#mejorPronosticoResultadoM").innerHTML = "Resultado esperado en el siguiente mes: " + Number(PtmacM[100].toFixed(2));
            document.querySelector("#mejorPronosticoResultadoN").innerHTML = "Resultado esperado en el siguiente mes: " + Number(PtmacN[100].toFixed(2));
            new Chart("myChart2", {
                type: "line",
                data: {
                    labels: Periodo,
                    datasets: [{
                    data: PtmacM,
                    label: "Michoacan",
                    borderColor: "red",
                    fill: false
                    },{
                    data: PtmacN,
                    label: "Nayarit",
                    borderColor: "green",
                    fill: false
                    }]
                },
                options: {
                    
                    title: {
                        display: true,
                        text: 'Homicidios en Nayarit y Michoacan mejor pronostico PTMAC'
                    }
                }
                });
                new Chart("myChartBar", {
                    type: 'line',
                    data: {
                        labels: Periodo,
                        datasets: [{
                        data: FCompletaNayarit,
                        label: "Frecuencia Nayarit",
                        backgroundColor: "red",
                        borderColor:"red",
                        fill: true
                        },{
                        data: PtmacN,
                        label: " PTMAC Nayarit",
                        backgroundColor: "green",
                        borderColor:"green",
                        fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                        title: {
                            display: true,
                            text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                        },
                        tooltip: {
                            mode: 'index'
                        },
                        },
                        interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                        },
                        scales: {
                        x: {
                            title: {
                            display: true,
                            text: 'Month'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                            display: true,
                            text: 'Value'
                            }
                        }
                        }
                    }
                    });
                    new Chart("myChartBar1", {
                        type: 'line',
                        data: {
                            labels: Periodo,
                            datasets: [{
                            data: FCompletaMichoacan,
                            label: "Frecuencia Michoacan",
                            backgroundColor: "red",
                            borderColor:"red",
                            fill: true
                            },{
                            data: PtmacM,
                            label: " PTMAC Michoacan",
                            backgroundColor: "green",
                            borderColor:"green",
                            fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                            title: {
                                display: true,
                                text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked 
                            },
                            tooltip: {
                                mode: 'index'
                            },
                            },
                            interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                            },
                            scales: {
                            x: {
                                title: {
                                display: true,
                                text: 'Month'
                                }
                            },
                            y: {
                                stacked: true,
                                title: {
                                display: true,
                                text: 'Value'
                                }
                            }
                            }
                        }
                        });
            
            break;
    
        default:
            break;
    }
    genera_tabla(V,MP,Periodo,FCompletaNayarit,seleccionadoN,mejorPronosticoN,'Nayarit')
    genera_tabla(V,MP,Periodo,FCompletaMichoacan,seleccionadoM,mejorPronosticoM,'Michoacan')

   document.querySelector("#tablas1").innerHTML = 'Tablas de datos'
    

}



