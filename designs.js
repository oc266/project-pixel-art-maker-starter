// Creates interactive tables
const heightInput = document.querySelector('#input_height');
const widthInput = document.querySelector('#input_width');
const buildTableButton = document.querySelector('#submit_button');
const toggleTableButton = document.querySelector('#table_style');
const clearTableButton = document.querySelector('#clear_grid_button');
const canvasHeader = document.querySelector('#canvas_header');
const table = document.querySelector('#pixel_canvas');
const colorPicker = document.querySelector('#colorPicker');
const clearGrid = document.querySelector('#clear_grid_button');

// Function to set up the table
function makeTable(table, gridHeight, gridWidth, tableType) {

  // old table body to replace
  const oldTbodies = table.tBodies;
  // create a new tbody element to insert in place of the old
  let newTbody = document.createElement('tbody');
  // create the rows and columns for the new tbody
  let htmlToAdd = '';
  for (i = 0; i < gridHeight; i++) {
    htmlToAdd = htmlToAdd + '<tr class = ' + i + '>';
    for (j = 0; j < gridWidth; j++) {
      htmlToAdd = htmlToAdd + '<td class =' + j + '> </td>';
    };
    htmlToAdd = htmlToAdd + ' </tr>';
  };
  // insert the text for the rows and columns in the new tbody element
  newTbody.insertAdjacentHTML('beforeEnd', htmlToAdd);
  // insert the new tbody in place of the old
  oldTbodies[0].parentNode.replaceChild(newTbody, oldTbodies[0]);

  var listOfBoxes = document.querySelectorAll('td');

  // Color each cells in chosen color if this is the chosen type of table
  if (tableType === "Colored Table") {
    for (let i = 0; i < listOfBoxes.length; i++) {
      listOfBoxes[i].style.cssText = 'background-color: ' + colorPicker.value;
    };
  };

  // Color each cell randomly if this is the chosen type of table
  if(tableType === "Rainbow Table") {
    for (let i = 0; i < listOfBoxes.length; i++) {
      let red = Math.floor(Math.random() * 267);
      let green = Math.floor(Math.random() * 267);
      let blue = Math.floor(Math.random() * 267);
      listOfBoxes[i].style.cssText = 'background-color: rgb(' + red + ', ' + green + ', ' + blue + ')';
    };
  };

  // Change the color of a cell in the table when it is clicked
  table.addEventListener('mousedown', function(evt) {
    let clickedBox = evt.target;
  // Change the color of the cell that has been clicked on
    clickedBox.style.cssText = 'background-color: ' + colorPicker.value;
 });

    // Remove border between cells of the same color
    //($(this).next().css('background-color') === $(this).css('background-color')){
      //$(this).css('border-right', '1px solid '+ $(this).css('background-color'));
    //};
   // if ($(this).prev().css('background-color') === $(this).css('background-color')){
     // $(this).prev().css('border-right', '1px solid '+ $(this).css('background-color'));
   // };
  //  if ($(this).parent().prev().children('.' + $(this).attr('class')).css('background-color') === $(this).css('background-color')) {
     //$(this).parent().prev().children('.' + $(this).attr('class')).css('border-bottom', '1px solid '+ $(this).css('background-color'));
   // };
  //if ($(this).parent().next().children('.' + $(this).attr('class')).css('background-color') === $(this).css('background-color')) {
    //$(this).css('border-bottom', '1px solid '+ $(this).css('background-color'));
  //  };
  //});

  // Clear the grid if the clear grid button is pressed

  clearGrid.addEventListener('click', function(evt) {
    for (let i = 0; i < listOfBoxes.length; i++) {
      listOfBoxes[i].style.cssText = 'background-color: white; border: 1px solid black';
    };
  });
};

//When Colored Table is clicked, toggle this
toggleTableButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  let tableStyle = toggleTableButton.textContent;
  switch (tableStyle) {
    case "Normal Table":
      toggleTableButton.textContent = "Colored Table";
      break;
    case "Colored Table":
      toggleTableButton.textContent = "Rainbow Table";
      break;
    case "Rainbow Table":
      toggleTableButton.textContent = "Normal Table";
      break;
    default:
      break;
  };
});

// When Submit is clicked, set up the table
buildTableButton.addEventListener('click', function(evt) {
  evt.preventDefault();

  // Set the title for the canvas as "Design Canvas" and the color to black in case it had previously had to display an error notice
  canvasHeader.textContent = "Design Canvas";
  canvasHeader.style.color = 'black';

  // Create variables
  let gridHeight = heightInput.value;
  let gridWidth = widthInput.value;
  let tableStyle = document.querySelector('#table_style').textContent;

  // If grid width or height chosen is greater than 100, print error note
  if (gridHeight > 100 || gridWidth > 100) {
    canvasHeader.textContent = "Are you out of your mind? That grid is way too big!";
    canvasHeader.style.color = 'red';
    gridWidth = 0;
    gridHeight = 0;
  };

  // Call makeGrid function to create a table
  makeTable(table, gridHeight, gridWidth, tableStyle);
});
