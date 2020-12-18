function seatingArrangement(seatingMatrix, queue) {
  // get maximum row count
  let maxRowCount = Math.max.apply(
    Math,
    seatingMatrix.map((mat) => mat[0])
  );
  //get maximum column count
  let maxColCount = Math.max.apply(
    Math,
    seatingMatrix.map((mat) => mat[1])
  );
  // create a seating matrix
  let seats = fillSeats(seatingMatrix);

  // fill seats in the order of Aisle, Window and Middle
  let nameSeats = {};
  nameSeats = arrangeSeat('A', 1, seats, maxRowCount, maxColCount, queue);
  nameSeats = arrangeSeat(
    'W',
    nameSeats.counter,
    nameSeats.seats,
    maxRowCount,
    maxColCount,
    queue
  );
  nameSeats = arrangeSeat(
    'M',
    nameSeats.counter,
    nameSeats.seats,
    maxRowCount,
    maxColCount,
    queue
  );
  seats = nameSeats.seats;
  displaySeatingArrangement(seats, maxColCount, maxRowCount);
}

function fillSeats(seats) {
  let arr = [];

  // Based on the 2D input, create the matrix of seats and fill them up with 'M'
  for (let i = 0; i < seats.length; i++)
    arr.push(
      Array(seats[i][0])
        .fill()
        .map(() => Array(seats[i][1]).fill('M'))
    );

  // Loop through the new created seat matrix and fill left most and right most of the matrix with 'A'
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j][0] = 'A';
      arr[i][j][arr[i][j].length - 1] = 'A';
    }
  }
  // Only either of the sides are going to be window, i.e left and right side of the aircraft
  for (let i = 0; i < arr[0].length; i++) arr[0][i][0] = 'W';
  for (let i = 0; i < arr[arr.length - 1].length; i++)
    arr[arr.length - 1][i][arr[arr.length - 1][i].length - 1] = 'W';

  return arr;
}

function arrangeSeat(position, counter, seats, maxrow, maxcolumn, queue) {
  // loop through rows and columns
  for (let i = 0; i < maxcolumn; i++) {
    for (let j = 0; j < maxrow; j++) {
      // if there is no column and row of a given matrix, skip it.
      if (seats[j] == null || seats[j][i] == null) continue;
      for (k = 0; k < seats[j][i].length; k++) {
        // set a counter starting from 1 and keep adding it to the seats
        if (
          seats[j] != null &&
          seats[j][i] != null &&
          seats[j][i][k] === position
        ) {
          // get the number of people waiting in queue and allocate the seats only for those
          if (counter <= queue) {
            seats[j][i][k] = `${position}-${counter}`;
            counter++;
          } else {
            // for excess seats make it vacant
            seats[j][i][k] = `Vacant`;
          }
        }
      }
    }
  }
  return { seats, counter };
}

function displaySeatingArrangement(seats, colmax, rowmax) {
  // concatenate the arrays in to one long string
  let finalString = '';
  for (let i = 0; i < colmax; i++) {
    for (let j = 0; j < rowmax; j++) {
      if (seats[j] == null || seats[j][i] == null) {
        // if the matrix is not availabe set it to '-'
        finalString += ' - ';
        continue;
      }
      for (k = 0; k < seats[j][i].length; k++) {
        finalString += seats[j][i][k] + ' ';
      }
      finalString += '| ';
    }
    finalString += '\n\n';
  }
  console.log(finalString);
}

// change the values for the input here

// seatingArrangement(Matrix, Queue)

seatingArrangement(
  [
    [3, 2],
    [4, 3],
    [2, 3],
    [3, 4],
  ],
  30
);
