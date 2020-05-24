module.exports = async (event, context) => {

    await sleep(250);
    const response = {data: {}};
    return context
        .status(200)
        .succeed(response);
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}