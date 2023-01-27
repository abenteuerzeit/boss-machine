const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    if (!numWeeks ||!weeklyRevenue) {
        return res.status(400).send('numWeeks and weeklyRevenue are required');
    }
    if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        return res.status(400).send('numWeeks and weeklyRevenue must be numbers');
    }
    if (numWeeks * weeklyRevenue < 1000000) {
        return res.status(400).send('The total yield must be at least 1 million dollars');
    }
    next();    
};
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
