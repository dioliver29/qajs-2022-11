/**
 * Успеваемость учеников
 * @param {Object} scores
 * @param {string} scores.key - Имя ученика
 * @param {number} scores[key] - Успеваемость ученика
 */
const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
};


/**
 * Подсчет суммы всех баллов
 * @returns {number}
 */
const getScore = () => {
    let scoresSum = 0;
    for (let key in scores) {
        scoresSum += scores[key];
      }
    return scoresSum;
};
export default getScore;

console.log(getScore());