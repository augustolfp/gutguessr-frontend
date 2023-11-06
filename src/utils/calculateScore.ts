export default function calculateScore(distanceInKm: number) {
    const score = 5000.054 * 0.99933 ** distanceInKm;
    return parseInt(score.toFixed(0));
}
