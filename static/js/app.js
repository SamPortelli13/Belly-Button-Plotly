
url="data/samples.json";

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - id
 * index 1 - ethnicity
 * index 2 - gender
 * index 3 - age
 * index 4 - location
 * index 5 - bbtype
 * index 6 - wfreq
 */
/**
 * @param {array} rows2
 * @param {integer} index2
 * index 0 - id
 * index 1 - otu_ids
 * index 2 - otu_labels
 * index 3 - sample_values
*/

console.log("started");

// Setup init ID as "940" and populate the list of ID names.
let id ="940";
init(id);

function init(id) {
d3.json("data/samples.json").then(function(data) {
        names = data.names;
        
        // Setup ID Selections
        const meta2 = d3.select("#selDataset");

        // Populate the names of the OTUs for menu selection
        Object.keys(names).forEach((k) => {    
          if (k > 1) {
          meta2.append('option').text(`${names[k]}`);     
          }
        });

        metadata = data.metadata;
        samples = data.samples;

        // Filter the data based on the ID selected
        console.log("##### ID: ",id);
        let filtered = samples.filter(sample => sample.id === id);
        let filtered_demog = metadata.filter(demog => demog.id == id);

        // Buid an array for the demographic table
        demographic_item={};
        for (let i=0; i < filtered_demog.length; i++)  {
          demographic_item ={id: filtered_demog[i]['id'],
          ethnicity: filtered_demog[i]['ethnicity'],
          gender:filtered_demog[i]['gender'],
          age: filtered_demog[i]['age'] ,
          location: filtered_demog[i]['location'],
          bbtype: filtered_demog[i]['bbtype'] ,
          wfreq: filtered_demog[i]['wfreq']};
        };
        
        // Show the filtered data values
        let y = filtered.map(otus => otus.otu_ids);
        console.log("filtered Demog: ", filtered_demog);
        console.log("filtered: ",filtered);
        console.log("filtered[0] otu_ids: ",filtered[0].otu_ids);
        console.log("mapped otu ids for ID: ",id, " ", y[0].slice(0, 10));

        let sample = data.samples.filter(sample => sample.id === id);

        // Data for bar plot
        let x_bar = sample[0].sample_values.slice(0,10).reverse();
        console.log("x bar: ",x_bar);
 
        let y_bar = y[0].slice(0,10).map(String).reverse();
        
        for (let i=0; i < y_bar.length; i++)  {
            y_bar[i]="OTU " + y_bar[i];
            console.log("y-bar:",y_bar[i]);
        }
          console.log("y bar: ",y_bar);

        // Put together the Bar Chart Details
        var trace1 = {
          x: x_bar,
          y: y_bar,
          text: y_bar,
          name: "OTUs",
          type: "bar",
          orientation: "h"
        };
        
        // data
        var chart_data = [trace1];
        
        // Apply the group bar mode to the layout
        var layout = {
          title: "Top 10 OTUs",
          height: 550,
          width: 400,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }
        };
        
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chart_data, layout);

        // Display the demographic data

        const meta = d3.select("#sample-metadata");    

        // Reprint the Demographics details
        Object.keys(demographic_item).forEach((k) => {    
          console.log("adding to table: ",k, demographic_item[k]);    
          meta.append("p").text(`${k}: ${demographic_item[k]}`);         
        });
        
        //  Render the bubble chart and the guage chart for the ID selected
        plotBubble(sample);
        plotGuage(filtered_demog[0].wfreq);


    });
  }
//Function to be called with each ID selected
function optionChanged() {
  var id = document.getElementById("selDataset").value;
  console.log("###selected id: ", id);
  // Prevent the page from refreshing
  //d3.event.preventDefault();
  // Clear the table
  var table1 = document.getElementById("sample-metadata"); 
  table1.innerHTML ='';  
  init(id);
}

// Bubble chart for the OTU samples
function plotBubble(data) {
  console.log("data into bubble plot: ",data);
  console.log("otu_ids: ",data[0]["otu_ids"]);
  console.log("sample_values: ",data[0]["sample_values"]);

  var trace1 = {
    x: data[0]["otu_ids"],
    y: data[0]["sample_values"],
    text: data[0]["otu_labels"],
    mode: 'markers',
    marker: {
      size: data[0]["sample_values"],
      color: data[0]["otu_ids"],
      colorscale: 'Jet',
    }
  };
  
  var chart_data = [trace1];
  var layout = {
    title: 'OTU Samples',
    showlegend: false,
    height: 600,
    width: 1100
  };
  
  Plotly.newPlot('bubble', chart_data, layout);
}

// Guage chart for the Wash Frequency
function plotGuage(wfreq, guageDiv) {
  var guageDiv = document.getElementById('guage'); 
  console.log("wash frequency: ",wfreq);
  console.log("guageDiv: ",guageDiv);
  // table2.innerHTML ='';

  var traceA = {
    type: "pie",
    showlegend: false,
    hole: 0.5,
    rotation: 90,
    values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
    text:["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",""],
    direction: "clockwise",
    textinfo: "text",
    textposition: "inside",
    marker: {
      colors: ["rgba(255,238,153,0.6)","rgba(255,230,102, 0.6)","rgba(255, 255,102, 0.6)","rgba(255,255,51, 0.6)",
      "rgba(255,255,1, 0.6)","rgba(179,255,102, 0.6)",
      "rgba(106,255,77, 0.6)",
      "rgba(43,255,0, 0.6)",
      "rgba(0,179,0, 0.6)","white"]

    },
    labels:["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",""],
    hoverinfo: "label"
    };

  var degrees =(wfreq+0.5)*20, radius = 2;
  console.log("degrees: ",degrees);
  var radians = degrees * Math.PI /180;
  var x_val = -1 * radius * Math.cos(radians);
  var y_val = radius * Math.sin(radians);

  var theta = degrees;
  var r = radius;
  var x_head = r * Math.cos(Math.PI/180*theta);
  var y_head = r * Math.sin(Math.PI/180*theta);  

  var layout = {
    shapes:[{
      type: 'line',
      x0: 0.5,
      y0: 0.5,
      x1: (x_val*0.11)+0.5,
      y1: (y_val*0.11)+0.5,
      line: {
        color: 'red',
        width: 7
      }
    }],
    title: "Belly Button Washing Frequency<br>Scrubs per Week",
    xaxis: {visible: false, range: [-1, 1]},
    yaxis: {visible: false, range: [-1,1]},

    };

    var chart_data = [traceA];
    
    Plotly.newPlot('guage', chart_data, layout);
  }

