// In input variables
const sAddLine = document.getElementById("addline");
const bSort = document.getElementById("sort");
const bRandomise = document.getElementById("randomise");
const menuSorting = document.getElementById("sorting-algorithm");

// Container for the lines
const container = document.getElementById("sortspeed");

let lines = [1, 2, 3, 4, 5, 6, 7 , 8, 9, 10];
let id;

//Stylesheet for bars
let styleSheet = document.createElement("style");
let styleSheetColor = document.createElement("style");

// Create sorting algorythm objects
let bubbleSort = new BubbleSort(lines);
let bogoSort = new BogoSort(lines);

// Set lines when page is loaded
document.addEventListener('DOMContentLoaded', setLinesToContainer(lines));

// Lines slider 
sAddLine.oninput = () => {
    clearInterval(id);
    styleSheetColor.remove();
    lines = [];
    for(i = 1;i <= sAddLine.value; i++) {
        lines.push(i);
    }
    setLinesToContainer(lines);
}

// Randomise lines button
bRandomise.addEventListener('click', () => {
    lines = randomiseArray(lines);
    setLinesToContainer(lines);
});

// Start sorting the lines
bSort.addEventListener('click', () => {
    if(menuSorting.value =="bubblesort") {
        bubbleSort.setArray(lines);
        id = setInterval(function() {sortbubble(bubbleSort)}, 10);
    } else if (menuSorting.value == "bogosort") {
        bogoSort.setArray(lines);
        id = setInterval(function() {
            if(!bogoSort.isSorted()) {
                bogoSort.sortOneCycle();
                setLinesToContainer(bogoSort.getArray());
            } else {
                clearInterval(id);
            }
        }, 10);
    }
});

// Set the lines in the table element according the the array
function setLinesToContainer(array) {
    container.innerHTML = '';
    let styles = "";
    array.forEach(element => {
        let htmlLine = 
        `<td valign="bottom">
            <div class="l${element}"></div>
        </td>`;
        container.innerHTML += htmlLine;
    
        styles += `
        .l${element} {
            border-left: 20px solid green;
            height: ${element * 20}px;
            width: 0;
            float: left;
            margin: 3px;
        }`;
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    });
}

// Bubble sort logic
function sortbubble(bub) {
    let currSort = bub.sortOneCycle();
    if(currSort != 0) {
        let styles = `
        .l${currSort[0][0]} {
            border-left: 20px solid red !important;
        }
        .l${currSort[0][1]} {
            border-left: 20px solid red !important;
        }`;
        styleSheetColor.innerText = styles;
        document.head.appendChild(styleSheetColor);
    
        setLinesToContainer(bub.getArray());
    } else if(currSort == 0) {
        clearInterval(id);
        styleSheetColor.remove();
    }
}

// Randomise values in array function
function randomiseArray(array) {
    let currentIndex = array.length, randomIndex;
    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
    }
    return array;
}