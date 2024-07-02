 //  bar chart 
function fetchDataAndUpdateChart() {
  fetch('/get-databar')
    .then(response => response.json())
    .then(data => {
     
      // Convert the received data to the format expected by amCharts
      const formattedData = data.map(item => ({
        category: item["Sub-Category"],
        value: item.TotalSales
      }));

      // Update the chart with the formatted data
      updateChart(formattedData);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function updateChart(data) {
  am5.ready(function() {
    // Create root element
    var root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panY: false,
      wheelY: "zoomX",
      wheelx: "zoomY",
      layout: root.horizontalLayout
    }));
    


    // Create Y-axis
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Create X-Axis
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {
      
        opposite: false,
        minGridDistance: 30
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    xAxis.data.setAll(data);

    // Create series
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Total Sales",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    series.data.setAll(data);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
  }); // end am5.ready()
}

// Listen for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Event listener for Bar Chart checkbox
  document.getElementById('barChartCheckbox').addEventListener('change', function(event) {
    var displayStyle = event.target.checked ? 'block' : 'none';
    document.getElementById('chartdiv').style.display = displayStyle;
    if (event.target.checked) fetchDataAndUpdateChart(); // Call the function only if the checkbox is checked
  });
})


// creat scatter plot

function fetchDataAndUpdateChart2() {
  fetch('/get-datascatter') 
    .then(response => response.json())
    .then(data => {
      updateChart2(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function updateChart2(data) {
  am5.ready(function() {
    var root = am5.Root.new("chartdiv2");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelY: "zoomXY",
      pinchZoomX: true,
      pinchZoomY: true
    }));


    // X-axis (Discount Rate)
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      extraMin: 0.1, // adds some space before the first category
      extraMax: 0.1, // adds some space after the last category
      tooltip: am5.Tooltip.new(root, {})
    }));
    xAxis.get("renderer").labels.template.setAll({
      fontSize: 15,
      fontWeight: "500"
    });
    xAxis.get("renderer").grid.template.setAll({
      strokeOpacity: 0.1
    });
    xAxis.set("title", am5.Label.new(root, {
      text: "Discount Rate (%)",
      fontSize: 15,
      fontWeight: "500",
      dy: 25
    }));

    // Y-axis (Total Profit)
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    yAxis.get("renderer").labels.template.setAll({
      fontSize: 15,
      fontWeight: "500"
    });
    yAxis.get("renderer").grid.template.setAll({
      strokeOpacity: 0.1
    });
    yAxis.set("title", am5.Label.new(root, {
      text: "Total Profit",
      fontSize: 15,
      fontWeight: "500",
      rotation: -90,
      dx: -25
    }));

    var series = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "TotalProfit",
      valueXField: "Discount",
      stroke: root.interfaceColors.get("background"),
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "Discount: {valueX}% \nProfit: {valueY}"
      })
    }));

    series.bullets.push(function() {
      var circle = am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0x4792E6) // this color should match your theme or preference
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    // Process and set the data
    var processedData = data.map(function(item) {
      return {
        Discount: item.Discount * 100, // Assuming the Discount is in decimal form
        TotalProfit: item.TotalProfit
      };
    });

    series.data.setAll(processedData);

    chart.appear(1000, 100);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchDataAndUpdateChart2();
});





// pie chart 


        function fetchDataAndUpdateChart3() {
          fetch('/get-datapie')
              .then(response => response.json())
              .then(data => {
              
                  updateChart3(data);
              })
              .catch(error => console.error('Error fetching data:', error));
      }
      
      function updateChart3(data) {
          am5.ready(function() {
              // Create root element for the chart
              var root = am5.Root.new("chartdiv3");
      
              // Create the chart
              var chart = root.container.children.push(am5percent.PieChart.new(root, {
                  layout: root.verticalLayout
              }));

            

      
              // Create series for the pie chart
              var series = chart.series.push(am5percent.PieSeries.new(root, {
                  valueField: "TotalSales",
                  categoryField: "Category"
              }));
      
              // Set the data for the series
              series.data.setAll(data);
      
              // Add a legend to the chart
              var legend = chart.children.push(am5.Legend.new(root, {
                  centerX: am5.percent(50),
                  x: am5.percent(50),
                  layout: root.horizontalLayout
              }));
      
              // Set the data for the legend
              legend.data.setAll(series.dataItems);
          });
      }
      
      document.addEventListener('DOMContentLoaded', function() {
          fetchDataAndUpdateChart3();
      });
      





// stacked bar chart 

      function fetchDataAndUpdateChart5() {
        fetch('/get-stackbar') 
          .then(response => response.json())
          .then(data => {
            updateChart5(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }
      
      function updateChart5(data) {
        am5.ready(function() {
          // Create root element
          var root = am5.Root.new("chartdiv5");
      
          // Set themes
          root.setThemes([am5themes_Animated.new(root)]);
      
          // Create chart
          var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
          }));
       
          // Create axes
          var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "Year",
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
          }));
      
          var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            extraMax: 0.1, // adds some space
            renderer: am5xy.AxisRendererY.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
          }));
      
          // Add series for each region
          function makeSeries(name, fieldName, color) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: "Year"
            }));
      
            series.columns.template.setAll({
              tooltipText: "{name}: {valueY}",
              tooltipY: 0,
              fill: color
            });
      
            series.data.setAll(data);
         
            series.appear(1000);
          }
      
          // Generate series for each field dynamically
          var colors = [
            am5.color(0x845EC2),
            am5.color(0xD65DB1),
            am5.color(0xFF6F91),
            am5.color(0xFF9671),
            am5.color(0xFFC75F),
            am5.color(0xF9F871)
          ];
      
          var colorIndex = 0;
          if (data.length > 0) {
            Object.keys(data[0]).forEach(key => {
              if (key !== "Year" && key !== "Region") {
                makeSeries(key.split('_').join(' '), key, colors[colorIndex % colors.length]);
                colorIndex++;
              }
            });
          }
      
          // Add cursor
          chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
          }));
      
          // Move legend to the bottom of the chart
          var legendContainer = root.container.children.push(am5.Container.new(root, {
            layout: root.horizontalLayout,
            marginTop: 15,
            width: am5.percent(100),
            height: am5.percent(10)
          }));
      
          var legend = legendContainer.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
          }));
      
          // Set data for xAxis and legend
          xAxis.data.setAll(data);
          legend.data.setAll(chart.series.values);
      
          // Add scrollbar
          chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
          }));
      
          // Make stuff animate on load
          chart.appear(1000, 100);
        });
      }
      

  // Event listener for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart5();
  });
  



// stacked area 

  am5.ready(function() {

    // Function to fetch data and update the chart
    function fetchDataAndUpdateChart() {
      fetch('/get-datastack') 
        .then(response => response.json())
        .then(data => {
          updateChart6(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    // Function to update the chart with fetched data
    function updateChart6(data) {
      // Create root element
      var root = am5.Root.new("chartdiv6");
  
      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);
  
      // Create chart
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      }));
  

    

      // Create axes
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "Year",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));
  
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
  
      // Process data to match the format expected by amCharts
      var processedData = data.reduce((acc, curr) => {
        let existing = acc.find(item => item.Year === curr.Year);
        if (existing) {
          existing[curr.Category] = (existing[curr.Category] || 0) + curr.TotalSales;
        } else {
          let newData = { Year: curr.Year };
          newData[curr.Category] = curr.TotalSales;
          acc.push(newData);
        }
        return acc;
      }, []);
  
      // Set data
      xAxis.data.setAll(processedData);
  
      // Function to create series
      function createSeries(field, name) {
        var series = chart.series.push(am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "Year",
          stacked: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: "[bold]{name}[/]: {valueY}"
          })
        }));
  
        series.fills.template.setAll({
          fillOpacity: 0.5,
          visible: true
        });
  
        series.strokes.template.setAll({
          strokeWidth: 2
        });
  
        series.data.setAll(processedData);
      }
  
      // Dynamically create series for each category
      let categories = Array.from(new Set(data.map(item => item.Category)));
      categories.forEach(category => createSeries(category, category));
  
      // Add legend
      chart.children.push(am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: root.verticalLayout
      }));
  
      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: chart.series.values
      }));
  
      // Add scrollbar
    
  
      // Make stuff animate on load
      chart.appear(1000, 100);
    }
  
   
    fetchDataAndUpdateChart();
  });
    
    document.addEventListener('DOMContentLoaded', function() {
      fetchDataAndUpdateChart();
    });

 