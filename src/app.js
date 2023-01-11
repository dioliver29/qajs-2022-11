const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
};

const getScore = () => {
    let scoresSum = 0;
    for (let key in scores) {
        scoresSum += scores[key];
      }
    return scoresSum;
};

console.log(getScore());