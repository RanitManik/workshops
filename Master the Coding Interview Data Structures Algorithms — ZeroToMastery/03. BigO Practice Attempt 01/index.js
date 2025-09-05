// Log all pairs of array
const boxes = [1, 2, 3, 4, 5];

// O(n)
for (let i = 0; i < boxes.length; i++) {
  // O(n)
  for (let j = 0; j < boxes.length; j++) {
    console.log(`[${boxes[i]}, ${boxes[j]}]`)
  }
}

// complexity O(n^2)