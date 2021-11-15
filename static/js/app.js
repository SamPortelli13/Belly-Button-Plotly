
url="samples.json"

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
let names, metadata, samples, mainObj= {};

let showObj = function() {
    for (let prop in mainObj) {
        console.log(prop);
        console.log(mainObj[prop]);
    }
    console.log("names2:",names);
    console.log("metdata2:", metadata);
    console.log("samples2:",samples);
    var id = unpack(metadata, 1);
    console.log("metadata - id: ",id);
    // var ethnicity = unpack(data.metadata, 1);
    // console.log("ethnicity: ",ethnicity);
    // var gender = unpack(data.metadata, 2);
    // console.log("gender: ",gender);
    // var age = unpack(data.metadata, 3);
    // console.log("age: ",age);
    // var location = unpack(data.metadata, 4);
    // console.log("location: ",location);
    // var bbtype = unpack(data.metadata, 5);
    // console.log("bbtype: ",bbtype);
    // var wfreq = unpack(data.metadata, 6);
    // console.log("wfreq: ",wfreq);

    // var sample_id = unpack(data.samples, 1);
    // console.log("sample_id: ",sample_id);
    // var otu_ids = unpack(data.samples, 1);
    // console.log("otu_ids: ",otu_ids);
    // var otu_labels = unpack(data.samples, 2);
    // console.log("otu_labels: ",otu_labels);
    // var sample_values = unpack(data.samples, 3);
    // console.log("sample_values: ",sample_values);    
}

fetch("samples.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data)  {
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;
        mainObj = data;
        showObj();
    });

function unpack(rows, index) {
    return rows.map(function(row) {
            console.log("each item:",row);
        return row[index];
    });
}


// var ethnicity = unpack(data.metadata, 1);
// console.log("ethnicity: ",ethnicity);
// var gender = unpack(data.metadata, 2);
// console.log("gender: ",gender);
// var age = unpack(data.metadata, 3);
// console.log("age: ",age);
// var location = unpack(data.metadata, 4);
// console.log("location: ",location);
// var bbtype = unpack(data.metadata, 5);
// console.log("bbtype: ",bbtype);
// var wfreq = unpack(data.metadata, 6);
// console.log("wfreq: ",wfreq);

// var sample_id = unpack(data.samples, 1);
// console.log("sample_id: ",sample_id);
// var otu_ids = unpack(data.samples, 1);
// console.log("otu_ids: ",otu_ids);
// var otu_labels = unpack(data.samples, 2);
// console.log("otu_labels: ",otu_labels);
// var sample_values = unpack(data.samples, 3);
// console.log("sample_values: ",sample_values);
   


// // Method which actually read json using XMLHttpRequest and promise
// const jsonFileReader = async path => {
//     return new Promise((resolve, reject) => {

//         const request = new XMLHttpRequest();
//         request.open('GET', path, true);
//         request.responseType = 'blob';

//         request.onload = () => {
//           const reader = new FileReader();

//           reader.onload = e => resolve(e.target.result);
//           reader.onerror = err => reject(err);
//           reader.readAsDataURL(request.response);
//         };

//         request.send();
//     });
// }

// const returnJsonData = async (url) => {
//     const jsondata = await jsonFileReader(url);
//     console.log('Here is your JSON data 1: => ', jsondata);
//     //data = JSON.parse(jsondata);
//     var names = data.names;

//     console.log("names: ",names);
//     console.log("##############");

//     var id = unpack(data.metadata, 0);
//     var ethnicity = unpack(data.metadata, 1);
//     var gender = unpack(data.metadata, 2);
//     var age = unpack(data.metadata, 3);
//     var location = unpack(data.metadata, 4);
//     var bbtype = unpack(data.metadata, 5);
//     var wfreq = unpack(data.metadata, 6);

//     var id = unpack(data.samples, 1);
//     var otu_ids = unpack(data.samples, 1);
//     var otu_labels = unpack(data.samples, 2);
//     var sample_values = unpack(data.samples, 3);
    
//     }

// console.log("start");
// function buildPlot() {
//     returnJsonData('samples.json');
 
//         //       var trace1 = {
//         //         type: "scatter",
//         //         mode: "lines",
//         //         name: name,
//         //         x: dates,
//         //         y: closingPrices,
//         //         line: {
//         //           color: "#17BECF"
//         //         }
//         //       };
        
//         //       var data = [trace1];
        
//         //       var layout = {
//         //         title: `${stock} closing prices`,
//         //         xaxis: {
//         //           range: [startDate, endDate],
//         //           type: "date"
//         //         },
//         //         yaxis: {
//         //           autorange: true,
//         //           type: "linear"
//         //         }
//         //       };
        
//         //       Plotly.newPlot("plot", data, layout);
      
// }
  
// buildPlot();


  // // Sort the data by Greek search results descending
// let sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);

// // Slice the first 10 objects for plotting
// slicedData = sortedByGreekSearch.slice(0, 10);

// // Reverse the array to accommodate Plotly's defaults
// reversedData = slicedData.reverse();

// // Trace1 for the Greek Data
// let trace1 = {
//   x: reversedData.map(object => object.greekSearchResults),
//   y: reversedData.map(object => object.greekName),
//   text: reversedData.map(object => object.greekName),
//   name: "Greek",
//   type: "bar",
//   orientation: "h"
// };

// // Data array
// // `data` has already been defined, so we must choose a new name here:
// let traceData = [trace1];

// // Apply a title to the layout
// let layout = {
//   title: "Greek gods search results",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
// // Note that we use `traceData` here, not `data`
// Plotly.newPlot("plot", traceData, layout);
