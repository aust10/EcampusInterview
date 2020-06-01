
// Function that processes the data and displays on the page
function processData (city) {
  // Create a table
  const dataTable = document.createElement('table')
  dataTable.setAttribute('id', 'theTable')
  document.body.appendChild(dataTable)
  // Set a constant for the table to be used later in the program
  const table = document.getElementById('theTable')

  // Add Headings to the Table
  const headers = document.createElement('tr')
  headers.setAttribute('id', 'headers')
  table.appendChild(headers)
  // Set a constant for the headers to be used later in the program
  const head = document.getElementById('headers')
  // First header
  const s = document.createElement('th')
  s.setAttribute('id', 'state')
  const stext = document.createTextNode('State')
  s.appendChild(stext)
  head.appendChild(s)
  // Second header
  const c = document.createElement('th')
  c.setAttribute('id', 'city')
  const ctext = document.createTextNode('City')
  c.appendChild(ctext)
  head.appendChild(c)

  // Make a loop to fill out the Data of the Table
  for (let i = 0; i < city.length; i++) {
  // Make a row for each City / State
    const row = document.createElement('tr')
    row.setAttribute('id', i)
    table.appendChild(row)

    // Make a Cell for the State
    const data = document.createElement('td')
    data.setAttribute('id', 'data')
    const text = document.createTextNode(city[i].State)
    data.appendChild(text)
    document.getElementById(i).appendChild(data)

    // Make a Cell for the City
    const data2 = document.createElement('td')
    data2.setAttribute('id', 'data')
    const text2 = document.createTextNode(city[i].city)
    data2.appendChild(text2)
    document.getElementById(i).appendChild(data2)
  }
}

// Function for Sorting Data Ascending and Decending
function sortData () {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0

  table = document.getElementById('theTable')

  document.getElementById('btn').innerText = 'Ascending'
  switching = true
  dir = 'asc'

  while (switching) {
  // Start by saying: no switching is done:
    switching = false
    rows = table.rows

    // Loop though all the rows excluding the header row
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false
      // Get the current element and the next element to compaire
      x = rows[i].getElementsByTagName('td')[1]
      y = rows[i + 1].getElementsByTagName('td')[1]
      // Check if the two rows should switch place:
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // Change the button text to the appropriate value
          document.getElementById('btn').innerText = 'Decending'
          shouldSwitch = true
          break
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      // If a switch has been marked, make the switch and mark that a switch has been done
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount++
    } else {
      // Check the switchcount and dir and set acoringly
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc'
        switching = true
      }
    }
  }
}

// Inital fetch of the data from server
fetch('/cities')
  .then(response => response.json())
  .then(data => processData(data))
  .then(console.log('fetched data from server'))
