document.getElementById("sudoku-board").addEventListener("keyup", function(event) {
    if(event.target && event.target.nodeName == "TD") {
        var validNum = /^[1-9]$/;
        var tdEl = event.target;
        if(tdEl.innerText.length > 0 && validNum.test(tdEl.innerText[0])) {
            tdEl.innerText = tdEl.innerText[0];
        } else {
            tdEl.innerText = "";
        }
    }
});
document.getElementById("solve-button").addEventListener("click", function() {
    var boardString = boardToString();
    var solution = SudokuSolver.solve(boardString);
    if(solution) {
        stringToBoard(solution);
    } else {
        alert("invalid board!");
    }
});
document.getElementById("clear-button").addEventListener("click", clearBoard);
function clearBoard() {
    var tds = document.getElementsByTagName('td');
    for(var i = 0; i < tds.length; i++) {
        tds[i].innerText = "";
    }
}
function boardToString() {
    var string = "";
    var validNum = /^[1-9]$/;
    var tds = document.getElementsByTagName("td");
    for(var i = 0; i < tds.length; i++) {
        if(validNum.test(tds[i].innerText[0])) {
            string += tds[i].innerText;
        } else {
            string += "-";
        }
    }
    return string;
}
function stringToBoard(string) {
    var currentCell;
    var validNum = /^[1-9]$/;
    var cells = string.split("");
    var tds = document.getElementsByTagName("td");
    for(var i = 0; i < tds.length; i++) {
        currentCell = cells.shift();
        if(validNum.test(currentCell)) {
            tds[i].innerText = currentCell;
        } else {
            tds[i].innerText = "";
        }
    }
}
("use strict");
var TESTABLE = true;
var SudokuSolver = (function(testable) {
    var solver;
    function solve(boardString) {
        var boardArray = boardString.split("");
        if(boardIsInvalid(boardArray)) {
            return false;
        }
        return recursiveSolve(boardString);
    }
    function solveAndPrint(boardString) {
        var solvedBoard = solve(boardString);
        console.log(toString(solvedBoard.split("")));
        return solvedBoard;
    }
    function recursiveSolve(boardString) {
        var boardArray = boardString.split("");
        if(boardIsSolved(boardArray)) {
            return boardArray.join("");
        }
        var cellPossibilities = getNextCellAndPossibilities(boardArray);
        var nextUnsolvedCellIndex = cellPossibilities.index;
        var possibilities = cellPossibilities.choices;
        for(var i = 0; i < possibilities.length; i++) {
            boardArray[nextUnsolvedCellIndex] = possibilities[i];
            var solvedBoard = recursiveSolve(boardArray.join(""));
            if(solvedBoard) {
                return solvedBoard;
            }
        }
        return false;
    }
    function boardIsInvalid(boardArray) {
        return !boardIsValid(boardArray);
    }
    function boardIsValid(boardArray) {
        return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
    }
    function boardIsSolved(boardArray) {
        for(var i = 0; i < boardArray.length; i++) {
            if(boardArray[i] === "-") {
                return false;
            }
        }
        return true;
    }
    function getNextCellAndPossibilities(boardArray) {
        for(var i = 0; i < boardArray.length; i++) {
            if(boardArray[i] === "-") {
                var existingValues = getAllIntersections(boardArray, i);
                var choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function(num) {
                    return existingValues.indexOf(num) < 0;
                });
                return {index: i, choices: choices};
            }
        }
    }
    function getAllIntersections(boardArray, i) {
        return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray, i));
    }
    function allRowsValid(boardArray) {
        for(var i = 0; i < 81; i += 9) {
            var row = boardArray.slice(i, i + 9);
            if(!unitsAreValid(row)) {
                return false;
            }
        }
        return true;
    }
    function getRow(boardArray, i) {
        var rowNum = Math.floor(i / 9);
        var firstIndex = rowNum * 9;
        return boardArray.slice(firstIndex, firstIndex + 9);
    }
    function allColumnsValid(boardArray) {
        for(var i = 0; i < 9; i++) {
            var column = getColumn(boardArray, i);
            if(!unitsAreValid(column)) {
                return false;
            }
        }
        return true;
    }
    function getColumn(boardArray, i) {
        var column = [];
        for(var j = i; j < 81; j += 9) {
            column.push(boardArray[j]);
        }
        return column;
    }
    function allBoxesValid(boardArray) {
        var boxCoordinates = [
            [0, 1, 2, 9, 10, 11, 18, 19, 20],
            [3, 4, 5, 12, 13, 14, 21, 22, 23],
            [6, 7, 8, 15, 16, 17, 24, 25, 26],
            [27, 28, 29, 36, 37, 38, 45, 46, 47],
            [30, 31, 32, 39, 40, 41, 48, 49, 50],
            [33, 34, 35, 42, 43, 44, 51, 52, 53],
            [54, 55, 56, 63, 64, 65, 72, 73, 74],
            [57, 58, 59, 66, 67, 68, 75, 76, 77],
            [60, 61, 62, 69, 70, 71, 78, 79, 80],
        ];
        for(var i = 0; i < 9; i++) {
            var box = getBox(boardArray, boxCoordinates[i][0]);
            if(!unitsAreValid(box)) {
                return false;
            }
        }
        return true;
    }
    function getBox(boardArray, i) {
        var boxCoordinates = [
            [0, 1, 2, 9, 10, 11, 18, 19, 20],
            [3, 4, 5, 12, 13, 14, 21, 22, 23],
            [6, 7, 8, 15, 16, 17, 24, 25, 26],
            [27, 28, 29, 36, 37, 38, 45, 46, 47],
            [30, 31, 32, 39, 40, 41, 48, 49, 50],
            [33, 34, 35, 42, 43, 44, 51, 52, 53],
            [54, 55, 56, 63, 64, 65, 72, 73, 74],
            [57, 58, 59, 66, 67, 68, 75, 76, 77],
            [60, 61, 62, 69, 70, 71, 78, 79, 80],
        ];
        var boxIndex = Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3);
        return boxCoordinates[boxIndex].map(function(i) {
            return boardArray[i];
        });
    }
    function unitsAreValid(unit) {
        var seen = {};
        for(var i = 0; i < unit.length; i++) {
            if(unit[i] !== "-") {
                if(seen[unit[i]]) {
                    return false;
                }
                seen[unit[i]] = true;
            }
        }
        return true;
    }
    function toString(boardArray) {
        var boardString = "";
        for(var i = 0; i < boardArray.length; i++) {
            boardString += boardArray[i];
        }
        return boardString;
    }
    solver = {
        solve:solve,
        solveAndPrint: solveAndPrint,
        recursiveSolve: recursiveSolve,
        boardIsInvalid: boardIsInvalid,
        boardIsValid: boardIsValid,
        boardIsSolved: boardIsSolved,
        getNextCellAndPossibilities: getNextCellAndPossibilities,
        getAllIntersections: getAllIntersections,
        allRowsValid: allRowsValid,
        getRow: getRow,
        allColumnsValid: allColumnsValid,
        getColumn: getColumn,
        allBoxesValid: allBoxesValid,
        getBox: getBox,
        unitsAreValid: unitsAreValid,
        toString: toString
    };
    if(testable) {
        solver.testable = {
            recursiveSolve: recursiveSolve,
            boardIsInvalid: boardIsInvalid,
            boardIsValid: boardIsValid,
            boardIsSolved: boardIsSolved,
            getNextCellAndPossibilities: getNextCellAndPossibilities,
            getAllIntersections: getAllIntersections,
            allRowsValid: allRowsValid,
            getRow: getRow,
            allColumnsValid: allColumnsValid,
            getColumn: getColumn,
            allBoxesValid: allBoxesValid,
            getBox: getBox,
            unitsAreValid: unitsAreValid,
            toString: toString
        };
    }
    return solver;
})(TESTABLE);