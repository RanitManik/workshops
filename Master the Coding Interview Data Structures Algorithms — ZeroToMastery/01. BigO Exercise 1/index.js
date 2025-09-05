// What is the Big O of the below function? (Hint, you may want to go line by line)
function funChallenge(input) {
  let a = 10;
  a = 50 + 3; // O(1)

  // O(n) * O(af)
  for (let i = 0; i < input.length; i++) {
    // O(n)
    anotherFunction(); // O(af)
    let stranger = true;
    a++;
  }
  return a;
}

// So the complexity is O(n * af)
// where n is the length of the input array and af is the complexity of anotherFunction()
