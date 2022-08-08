// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Track all the filters as an object.
var allFilters = {};

// Update the filters as a function. 
function updateFilters() {

  // Save the element that was changed as a variable.
  let changedElement = d3.select(this);

  // Save the value that was changed as a variable.
  let elementValue = changedElement.property('value');

  // Save the id of the filter that was changed as a variable.
  let filterId = changedElement.attr('id');

  // If a filter value was entered then add that filterId and value to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    allFilters[filterId] = elementValue
  } else {
    delete allFilters[filterId]
  }
  // Call function to apply all filters and rebuild the table
  filterTable(allFilters);
}

// Filter the table when data is entered as a function.
function filterTable(allFilters) {
  
  // Set the filtered data to the tableData.
  let filteredData = tableData
  
  // Loop through all of the filters and keep any data that matches the filter values
  for (const id in allFilters){
    if (id){
      filteredData = filteredData.filter(row => row[id] === allFilters[id].toLowerCase())
    }
  }

  // Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}
  
// Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);
  
// Build the table when the page loads
buildTable(tableData);
