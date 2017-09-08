  
  var combinedDataArray = []; //Array to store all the data from the database.
  
  //Get JSON object from the database 
  $.getJSON('process.php', function(data) {
    
    combinedDataArray = data.slice(); //copy the array 

    //Call the main function
    initializeCharts();  
  });
  
  /*******************************************************
  *Create main function so that main function gets called*
  *only after getJSON finished get all the data from DB  *
  ********************************************************/
  function initializeCharts(){

    $(function() {

  var piechart;
  var combinedchart;
  var returnchart;
  var riskchart;
  var sharpechart;
  var sortinochart;
  var linechart;

  var pieallocations = [];
  var combinedallocations = [];
  var returnallocations = [];
  var riskallocations = [];
  var sharpeallocations = [];
  var sortinoallocations = [];
  var lineallocations = [];

  var initialLoadSlider = 0;

  lineoptions = {
    chart: {
      renderTo: 'linecontainer'
    },
    title: {
      text: 'Portfolio Performance'
    },
    xAxis: {
        type: 'datetime'
        },
    yAxis: {
        opposite: true,
        title: {
            text: null
        },
        labels: {
            format: '${value}'
        },
          min: 80,
          max: 300
    },
    legend: {

    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}; font-weight:bold">{series.name}:</span> ${point.y} <br/>',
      valueDecimals: 2
    },
    plotOptions: {
      series: {
        lineWidth: 5
      }
    },
    series: []
  };

  pieoptions = {
    chart: {
      renderTo: 'piecontainer',
      type: 'pie'
    },
    title: {
      text: 'Portfolio Allocation'
    },
    tooltip: {
      formatter: function() {
        return '<b>' + (this.y).toFixed(2) + '%</b>';
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          formatter: function () {
          if (this.y != 0) {
              return this.point.name + ', ' + (this.y).toFixed(0) + '%';
          } else {
              return null;
          }
        }
        }
      }
    },
    colors: [
      '#0d0d0d',
      '#4d4d4d',
      '#0810A6'
    ],
    series: []
  };


  returnoptions = {
    chart: {
      renderTo: 'returncontainer',
      type: 'column'
    },
    title: {
      text: 'Ann. Return'
    },
    xAxis: {
      categories: {
        enabled: false
      },
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: null
      },
      min: 5.5,
      max: 7
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        events: {
          legendItemClick: function() {
            return false;
          }
        },
        grouping: false
      },
      series: {
        dataLabels: {
          enabled: true,
          zIndex: 3,
          borderWidth:0,
          formatter: function () {
          return Highcharts.numberFormat(this.y,2) + '%';
        }
        }
      }
    },
    colors: [
      '#07d99a',
      '#ecf460'
    ],
    series: []
  };

  riskoptions = {
    chart: {
      renderTo: 'riskcontainer',
      type: 'column'
    },
    title: {
      text: 'Ann. Risk'
    },
    xAxis: {
      categories: {
        enabled: false
      },
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: null
      },
      min: 8,
      max: 8.5
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        events: {
          legendItemClick: function() {
            return false;
          }
        },
        grouping: false
      },
      series: {
        dataLabels: {
          enabled: true,
          zIndex: 3,
          borderWidth:0,
          formatter: function () {
          return Highcharts.numberFormat(this.y,2) + '%';
        }
        }
      }
    },
    colors: [
      '#07d99a',
      '#ecf460'
    ],
    series: []
  };

  sharpeoptions = {
    chart: {
      renderTo: 'sharpecontainer',
      type: 'column'
    },
    title: {
      text: 'Sharpe Ratio'
    },
    xAxis: {
      categories: {
        enabled: false
      },
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: null
      },
      //min: 0.75,
      //max: 1.25
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        events: {
          legendItemClick: function() {
            return false;
          }
        },
        grouping:false
      },
      series: {
        dataLabels: {
          enabled: true,
          zIndex: 3,
          borderWidth:0,
          formatter: function () {
          return Highcharts.numberFormat(this.y,2);
        }
        }
      }
    },
    colors: [
      '#07d99a',
      '#ecf460'
    ],
    series: []
  };
  
  sortinooptions = {
    chart: {
      renderTo: 'sortinocontainer',
      type: 'column',
    },
    title: {
      text: 'Sortino Ratio'
    },
    xAxis: {
      categories: {
        enabled: false
      },
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: null
      },
      //min: 1.5,
      //max: 2.0
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        events: {
          legendItemClick: function() {
            return false;
          }
        },
        grouping: false
      },
      series: {
        dataLabels: {
          enabled: true,
          zIndex: 3,
          borderWidth:0,
           style: {
                    textShadow: false
                },
          formatter: function () {
          return Highcharts.numberFormat(this.y,2);
          }
        },
        marker: {
          states: {
            hover: {
              enabled: false
            }
          }
        }
      }
    },
    colors: [
      '#07d99a',
      '#ecf460',
      '#000000'
    ],
    series: []
  };

  //LINE CHART MECHANISM
  //Objects and arrays to manipulate data from the database
  var series = {
    data: []
  };

  var k = 0;
  for(var i = 0; i <= 20; i++){
    if(!lineallocations[k]){
        lineallocations[k] = [];
      }
    for(var j = 0; j < combinedDataArray.length; j++){
      if(!lineallocations[k][j]){
        lineallocations[k][j] = [];
      }
      lineallocations[k][j][0] = parseFloat(combinedDataArray[j][11]);   //Get Date
      lineallocations[k][j][1] = parseFloat(combinedDataArray[j][12+i]); //Get di data
    }
    ++k;
  }

  //console.log("lineallocations");
  //console.log(lineallocations);

  var Only6040 = [];
  var Only6040 = [];

  for(var i = 0; i < combinedDataArray.length; i++){
    
    if(!Only6040[i]){
      Only6040[i] = [];
    }

    Only6040[i][0] = parseFloat(combinedDataArray[i][11]);   //Get Date

    Only6040[i][1] = parseFloat(combinedDataArray[i][12]);   //Get 6040 data
  }


  var initialDynamicLine = [];
  initialDynamicLine = lineallocations[0].slice(); //Copy to populate initial line data series

  //Fill in initial series of data to the line charts
    lineoptions.series.push({
      name:'Combined Portfolio',
      color: '#0810A6',
      data:initialDynamicLine
    }, {
      name:'Traditional 60/40',
      color: '#f4e950',
      lineWidth:3,
      data:Only6040
    });


  linechart = new Highcharts.Chart(lineoptions);


  //PIE CHART MECHANISM
  //Objects and arrays to manipulate data from the database
  var series = {
    data: []
  };

  var pieDataSql = [];
  pieDataSql.push('SP500','AGG','LEAD');

  //Convert column fomatted data from the database data into row-formatted data
  for(var i = 0; i < pieDataSql.length; i++){
    for(var j = 0; j <= 20; j++){
      pieDataSql[i] = pieDataSql[i] + ',' + combinedDataArray[j][i];
    }
  }

    $.each(pieDataSql, function(lineNo, line) {
      var items = line.split(',');
      
      Highcharts.each(items, function(i, numb) {  
        if (numb > 0) {
          pieallocations[numb - 1] ? pieallocations[numb - 1].push({
              name: items[0],
              y: parseFloat(i)
            }) :
            pieallocations[numb - 1] = [{
              name: items[0],
              y: parseFloat(i)
            }]
        }
      });
      series.data.push({
        type: 'pie',
        name: items[0],
        y: parseFloat(items[1])
      });
    });
    pieoptions.series.push(series);

    piechart = new Highcharts.Chart(pieoptions);
  //});
 

  //RETURN BAR CHART MECHANISM
  //Arrays to manipulate data from the database
  var series = [];
  returnDataSql = [];

  for(var i = 0; i <= 20; i++){

    returnallocations[i] = JSON.parse("[" + combinedDataArray[i][3] + ',' + 'null' +"]");
    returnDataSql[i] = JSON.parse("[" + 'null' + ',' + combinedDataArray[i][7] + "]");
  }

  var initialIndicator;
  var initialDynamicReturn;
  var initialStaticReturn;
  initialIndicator = parseFloat(combinedDataArray[initialLoadSlider][3]);
  initialDynamicReturn = returnallocations[initialLoadSlider].slice();  
  initialStaticReturn = returnDataSql[0].slice();


  returnoptions.series.push({
      name:'Combined Porfolio',
      color: '#0810A6',
      zIndex: 3,
      data: initialDynamicReturn
    }, {
       name: 'background',
       color: 'white',
       zIndex: 1,
       borderColor: "black",
       borderWidth: "2",
       showInLegend: false,
       dataLabels: false,
       data: [initialIndicator,0]
    }, {
      name: 'Traditional 60/40',
      color: '#f4e950',
      data: initialStaticReturn,
      zIndex: 3,
    }, {
      name: 'Indicator',
      type: 'scatter',
      data: [initialIndicator],
      enableMouseTracking: false,
      showInLegend: false,
      dataLabels: false,
      marker: {
        symbol: 'url(http://www.realitysharesadvisors.com/charts/6040LEAD/lineIndicator.png)'
      },
      zIndex: 5
    });
   
  returnchart = new Highcharts.Chart(returnoptions);


  
  //RISK BAR CHART MECHANISM
  //Objects and arrays to manipulate data from the database
  var series = [];
  riskDataSql = [];

  for(var i = 0; i <= 20; i++){

    riskallocations[i] = JSON.parse("[" + combinedDataArray[i][4] + ',' + 'null' +"]");
    riskDataSql[i] = JSON.parse("[" + 'null' + ',' + combinedDataArray[i][8] + "]");
  }

  var initialIndicator;
  var initialDynamicRisk;
  var initialStaticRisk;
  initialIndicator = parseFloat(combinedDataArray[initialLoadSlider][4]);
  initialDynamicRisk = riskallocations[initialLoadSlider].slice();  
  initialStaticRisk = riskDataSql[0].slice();

  riskoptions.series.push({
      name:'Combined Porfolio',
      color: '#0810A6',
      zIndex: 4,
      data: initialDynamicRisk
    }, {
       name: 'background',
       color: 'white',
       zIndex: 1,
       borderColor: "black",
       borderWidth: "2",
       showInLegend: false,
       dataLabels: false,
       data: [initialIndicator,0]
    }, {
      name: 'Traditional 60/40',
      color: '#f4e950',
      data: initialStaticRisk,
      zIndex:4,
    }, {
      name: 'Indicator',
      type: 'scatter',
      data: [initialIndicator],
      enableMouseTracking: false,
      showInLegend: false,
      dataLabels: false,
      marker: {
        symbol: 'url(http://www.realitysharesadvisors.com/charts/6040LEAD/lineIndicator.png)'
      },
      zIndex: 5
    });
   
  riskchart = new Highcharts.Chart(riskoptions);
  

  //SHARPE BAR CHART MECHANISM
  sharpeDataSql = [];
  for(var i = 0; i <= 20; i++){

    sharpeallocations[i] = JSON.parse("[" + combinedDataArray[i][5] + ',' + 'null' +"]");
    sharpeDataSql[i] = JSON.parse("[" + 'null' + ',' + combinedDataArray[i][9] + "]");
  }

  var initialIndicator;
  var initialDynamicSharpe;
  var initialStaticSharpe;
  initialIndicator = parseFloat(combinedDataArray[initialLoadSlider][5]);
  initialDynamicSharpe = sharpeallocations[initialLoadSlider].slice();  
  initialStaticSharpe = sharpeDataSql[0].slice();

    sharpeoptions.series.push({
      name:'Combined Porfolio',
      color: '#07d99a',
      zIndex: 4,
      data: initialDynamicSharpe
    }, {
       name: 'background',
       color: 'white',
       zIndex: 1,
       borderColor: "black",
       borderWidth: "2",
       showInLegend: false,
       dataLabels: false,
       data: [initialIndicator,0]
    }, {
      name: 'Traditional 60/40',
      color: '#f4e950',
      data: initialStaticSharpe,
      zIndex:4,
    }, {
      name: 'Indicator',
      type: 'scatter',
      data: [initialIndicator],
      enableMouseTracking: false,
      showInLegend: false,
      dataLabels: false,
      marker: {
        symbol: 'url(http://www.realitysharesadvisors.com/charts/6040LEAD/lineIndicator.png)'
      },
      zIndex: 5
    });
   
    sharpechart = new Highcharts.Chart(sharpeoptions);

  
  //SORTINO BAR CHART MECHANISM

  //Objects and arrays to manipulate data from the database
  var series = [];
  sortinoDataSql = [];

  for(var i = 0; i <= 20; i++){

    sortinoallocations[i] = JSON.parse("[" + combinedDataArray[i][6] + ',' + 'null' +"]");
    sortinoDataSql[i] = JSON.parse("[" + 'null' + ',' + combinedDataArray[i][10] + "]");
  }


    var initialIndicator;
    var initialDynamicSortino;
    var initialStaticSortino;
    initialIndicator = parseFloat(combinedDataArray[initialLoadSlider][6]);
    initialDynamicSortino = sortinoallocations[initialLoadSlider].slice();
    initialStaticSortino = sortinoDataSql[0].slice();

    sortinooptions.series.push({
      name:'Combined Porfolio',
      color: '#07d99a',
      zIndex: 4,
      data: initialDynamicSortino
      //grouping: false
    }, {
       name: 'background',
       color: 'white',
       zIndex: 1,
       borderColor: "black",
       borderWidth: "2",
       showInLegend: false,
       dataLabels: false,
       data: [initialIndicator,0]
    }, {
      name: 'Traditional 60/40',
      color: '#f4e950',
      data: initialStaticSortino,
      zIndex: 4,
    }, {
      name: 'Indicator',
      type: 'scatter',
      data: [initialIndicator],
      enableMouseTracking: false,
      showInLegend: false,
      dataLabels: false,
      marker: {
        symbol: 'url(http://www.realitysharesadvisors.com/charts/6040LEAD/lineIndicator.png)'
      },
      zIndex: 5
    });

    sortinochart = new Highcharts.Chart(sortinooptions);
    

  //Intial page load charts values
  piechart.series[0].setData($.extend([], true, pieallocations[initialLoadSlider]));
  returnchart.series[0].setData($.extend([], true, returnallocations[initialLoadSlider]));
  riskchart.series[0].setData($.extend([], true, riskallocations[initialLoadSlider]));
  sharpechart.series[0].setData($.extend([], true, sharpeallocations[initialLoadSlider]));
  sortinochart.series[0].setData($.extend([], true, sortinoallocations[initialLoadSlider]));
  linechart.series[0].setData($.extend([], true, lineallocations[initialLoadSlider]));
  
  

  $("#slider").slider({
    value: initialLoadSlider,
    min: 0,
    max: 20,
    step: 1,
    slide: function(event, ui) {
      //currPoint = ui.value;
      piechart.series[0].setData($.extend([], true, pieallocations[ui.value]));
      returnchart.series[0].setData($.extend([], true, returnallocations[ui.value]));
      riskchart.series[0].setData($.extend([], true, riskallocations[ui.value]));
      //sharpechart.series[0].setData($.extend([], true, sharpeallocations[ui.value]));
      //sortinochart.series[0].setData($.extend([], true, sortinoallocations[ui.value]));
      linechart.series[0].setData($.extend([], true, lineallocations[ui.value]));
    }
  });

  $("#list").on('change', function() {
    var selVal = $("#list").val();
      piechart.series[0].setData($.extend([], true, pieallocations[selVal]));
      returnchart.series[0].setData($.extend([], true, returnallocations[selVal]));
      riskchart.series[0].setData($.extend([], true, riskallocations[selVal]));
      sharpechart.series[0].setData($.extend([], true, sharpeallocations[selVal]));
      sortinochart.series[0].setData($.extend([], true, sortinoallocations[selVal]));
      linechart.series[0].setData($.extend([], true, lineallocations[selVal]));

    $("#slider").slider({
      value: selVal
    });
  });
});
}