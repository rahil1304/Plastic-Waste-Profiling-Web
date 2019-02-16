import {GoogleCharts} from 'google-charts';

GoogleCharts.load(drawChart);
GoogleCharts.load(drawChart2);
GoogleCharts.load(drawChart3);
GoogleCharts.load(drawChart4);


function drawChart() {
  

     const data = GoogleCharts.api.visualization.arrayToDataTable([
        ['Product', 'Objects',{role:'annotation'},{role:'style'}],
        ['Coca Cola', 35,35,'color:#f44336;opacity:0.8'],
        ['Lays', 75,75,'color:#3f51b5;opacity:0.8'],
        ['Maggi', 45,45,'color:#ffc107;opacity:0.8']
    ]);
  


    var options = {
         
        orientation:'vertical',
     
          animation:{duration: 3000,
        easing: 'out', "startup":true
      },
      backgroundColor:{fill:'transparent'},
      titleTextStyle:{color:"ffffff",fontName:'Roboto',fontSize:30,bold:false},
      
      hAxis: {
        gridlines:{
            color:'transparent'
        },
        textStyle: {
            color: '#ffffff',
            fontName:'Poppins'
        }
    },
    vAxis: {
       

        textStyle: {
            color: '#ffffff',
            fontName:'Poppins',
            
        }
    },
    legend:{position:'none'}
        };
    const linechart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chartBig1'));

   
    linechart.draw(data,options);
}

function drawChart2() {
  

//     const data = GoogleCharts.api.visualization.arrayToDataTable([
//        ['Product', 'Coca Cola','Maggi'],
//        ['2017', 35,315],
//        ['2018', 750,200],
//        ['2019', 234,134]
//    ]);
   const data = new GoogleCharts.api.visualization.DataTable();
   data.addColumn('number', 'Month');
      data.addColumn('number', 'Coca Cola');
      data.addColumn('number', 'Lays');
      data.addColumn('number', 'Maggi');

      data.addRows([
        [1,  55.8, 65.8, 81.8],
        [2,  70.9, 69.5, 62.4],
        [3,  85.4,   67, 75.7],
        [4,  81.7, 78.8, 85.5],
        [5,  50.9, 67.6, 90.4],
        [6,   96.8, 83.6,  79.7],
        [7,   66.6, 62.3,  90.6],
        [8,  62.3, 69.2, 80.6],
        [9,  80.9, 72.9, 69.8],
        [10, 100, 70.9, 70.6],
        [11,  60.3,  74.9,  74.7],
        [12,  60.6,  86.4,  75.2],
        [13,  83.8,  68.3,  63.6],
        [14,  68.2,  68.2,  73.4]
      ]);
 


   var options = {
       colors:['#f44336','#3f51b5','#ffc107'],
       curveType:'function',
       
    
         animation:{duration: 4000,
       easing: 'out', "startup":true
     },
     backgroundColor:{fill:'transparent'},
     titleTextStyle:{color:"ffffff",fontName:'Roboto',fontSize:30,bold:false},
     
     hAxis: {
        gridlines:{
            color:'transparent'
        },
       
       textStyle: {
           color: '#ffffff',
           fontName:'Poppins'
       }
   },
   vAxis: {
    viewWindow: {
        min: 50,
        max: 100
    },
    gridlines:{
        color:'transparent'
    },
      

       textStyle: {
           color: '#ffffff',
           fontName:'Poppins',
           
       }
   },
   legend:{position:'bottom',textStyle:{color:'white'}},
   pointSize:2
       };
   const linechart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chartBig2'));

  
   linechart.draw(data,options);
}


function drawChart3() {
  

    const data2 = GoogleCharts.api.visualization.arrayToDataTable([
       ['Sources', 'Contribution(In Million Tonnes)',{role:'annotation'},{role:'style'}],
       ['Packaging', 141,141,'color:#f44336;opacity:0.8'],
       ['Other Sectors', 42,42,'color:#3f51b5;opacity:0.8'],
       ['Textiles', 38,38,'color:#ffc107;opacity:0.8'],
       ['Consumer Products', 37,37,'color:#2196f3;opacity:0.8'],
       ['Transportation', 17,17,'color:#00e676;opacity:0.8'],
   ]);
 


   var options2 = {
        
     
         animation:{duration: 5000,
       easing: 'out', "startup":true
     },
     backgroundColor:{fill:'transparent'},
     titleTextStyle:{color:"ffffff",fontName:'Roboto',fontSize:30,bold:false},
     
     hAxis: {
      
       textStyle: {
           color: '#ffffff',
           fontName:'Poppins'
       }
   },
   vAxis: {
    textStyle: {
        color: '#ffffff',
        fontName:'Poppins',
        
    },
    gridlines:{
        color:'transparent'
    },

    
   },
   legend:{position:'none'}
       };
   const linechart3 = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chartBig3'));

  
   linechart3.draw(data2,options2);
}


function drawChart4() {
  

    const data2 = GoogleCharts.api.visualization.arrayToDataTable(
        [
            ['Country', 'Mismanaged Waste'],
            ['China', 15.6966],
['Indonesia', 10.1019],
['Philippines', 5.9153],
['Vietnam',5.75],
['Sri Lanka', 4.99],
['Thailand', 3.22],
['Egypt',3.03],
['Malaysia',2.9],
['Nigeria',2.67],
['Bangladesh',2.4],
['South Africa',1.9],
['India', 10.8],
['Germany', 0.4],
          ['United States', 0.04],
          ['Brazil', 0.03],
          ['Canada', 0.03],
          ['France', 0.02],
          ['RU',0.2]
          ]

    );
 


   var options2 = {
        colorAxis: {colors: ['#ffcc80', '#f57c00','#f44336']},
     
         animation:{duration: 6000,
       easing: 'out', "startup":true
     },
     backgroundColor:{fill:'transparent'},
     titleTextStyle:{color:"ffffff",fontName:'Roboto',fontSize:30,bold:false},
     
     hAxis: {
      
       textStyle: {
           color: '#ffffff',
           fontName:'Poppins'
       }
   },
   vAxis: {
    textStyle: {
        color: '#ffffff',
        fontName:'Poppins',
        
    },
    gridlines:{
        color:'transparent'
    },

    
   },
   legend:{position:'none'}
       };
   const linechart3 = new GoogleCharts.api.visualization.GeoChart(document.getElementById('chartBig4'));

  
   linechart3.draw(data2,options2);
}


