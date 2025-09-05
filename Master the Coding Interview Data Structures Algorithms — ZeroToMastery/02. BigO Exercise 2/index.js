// What is the Big O of the below function? (Hint, you may want to go line by line)
function anotherFunChallenge(input) {
  let a = 5; // O(1)
  let b = 10;
  let c = 50;

  // O(n)
  for (let i = 0; i < input; i++) {
    let x = i + 1;
    let y = i + 2;
    let z = i + 3;
  }

  // O(n)
  for (let j = 0; j < input; j++) {
    let p = j * 2;
    let q = j * 2;
  }

  // O(1)
  let whoAmI = "I don't know";
}

// O(n) where n is the input size
