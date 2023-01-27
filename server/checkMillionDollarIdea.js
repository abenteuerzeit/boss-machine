const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const totalValue = numWeeks * weeklyRevenue;
    if (totalValue < 1000000) {
        const err = new Error('Idea is not worth at least one million dollars.');
        err.status = 418;
        next(err);
    } else {
    next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
