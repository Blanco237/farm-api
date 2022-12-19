// Beans | Tomatoes | Corn | Yam | Potatoes | compost | water | lime

// 0 | 1 | 2  | 3 | 4  |5   |  6 | 7 | 8  | 9  | 10    |    11    |  12  |  13 | 14
// pH | N | K | P | Mg | Ca | Zn | S | Fe | Mn | Beans | Tomatoes | Corn | Yam | Potatoes 

const computeWeight = (_data, resultObj) => {
    const data = Array.from(_data);
    if (resultObj.BEANS) {
        data[1] = increaseByPercentage(data[0], 20);
        data[5] = reduceByPercentage(data[5], 5);
        data[3] = reduceByPercentage(data[3], 0.5);
        data[4] = reduceByPercentage(data[4], 1);
        data[2] = reduceByPercentage(data[2], 2.5);
        data[6] = reduceByValue(data[6], 50);
        data[9] = reduceByValue(data[9], 100);
    }
    if (resultObj.TOMATOES) {
        data[0] = reduceByPercentage(data[0], 15);
        data[1] = reduceByPercentage(data[1], 4);
        data[5] = reduceByPercentage(data[5], 3);
        data[3] = reduceByValue(data[3], 150);
        data[4] = reduceByPercentage(data[4], 0.8);
        data[2] = reduceByPercentage(data[2], 3);
    }
    if (resultObj.CORN) {
        data[1] = reduceByPercentage(data[1], 5);
        data[3] = reduceByPercentage(data[3], 4.5);
        data[2] = reduceByPercentage(data[2], 7.5);
        data[7] = reduceByPercentage(data[7], 5.2);
        data[6] = reduceByValue(data[6], 24);
        data[5] = increaseByPercentage(data[5], 20);
        data[4] = increaseByPercentage(data[4], 10);
        data[9] = increaseByPercentage(data[9], 5);
    }
    if (resultObj.YAM) {
        data[1] = reduceByPercentage(data[1], 3.2);
        data[2] = reduceByPercentage(data[2], 7);
        data[3] = reduceByPercentage(data[3], 0.3);
    }
    if (resultObj.POTATOES) {
        data[1] = reduceByPercentage(data[1], 8.5);
        data[2] = reduceByPercentage(data[2], 3.9);
        data[3] = reduceByPercentage(data[3], 4.3);
        data[4] = reduceByPercentage(data[4], 2.7);
        data[7] = reduceByPercentage(data[7], 0.3);
        data[6] = reduceByPercentage(data[6], 0.4);
        data[9] = reduceByPercentage(data[9], 1.2)
        data[5] = increaseByPercentage(data[5], 20);
    }
    if (resultObj.COMPOST > 0) {
        const percent = resultObj.COMPOST * 5;
        data[1] = increaseByPercentage(data[1], percent);
        data[2] = increaseByPercentage(data[2], percent);
        data[3] = increaseByPercentage(data[3], percent);
        data[4] = increaseByPercentage(data[4], percent);
        data[5] = increaseByPercentage(data[5], percent);
        data[6] = increaseByPercentage(data[6], percent);
        data[7] = increaseByPercentage(data[7], percent);
        data[8] = increaseByPercentage(data[8], percent);
        data[9] = increaseByPercentage(data[9], percent);
    }
    if (resultObj.WATER > 0) {
        const percent = resultObj.WATER * 1.5;
        data[0] = increaseByPercentage(data[0], percent);
    }
    if (resultObj.LIME > 0) {
        const percent = resultObj.LIME * 1.5;
        data[0] = increaseByPercentage(data[0], percent);
        data[5] = increaseByPercentage(data[5], percent);
        data[1] = increaseByPercentage(data[1], percent);
    }

    // console.log("Prev: ", _data);
    // console.log("Current: ", data);

    return data;
}

// 0 | 1 | 2  | 3 | 4  |5   |  6 | 7 | 8  | 9  | 10    |    11    |  12  |  13 | 14
// pH | N | K | P | Mg | Ca | Zn | S | Fe | Mn | Beans | Tomatoes | Corn | Yam | Potatoes


const reduceByPercentage = (total, percentage) => {
    const amountToReduce = (percentage / 100) * total;
    return abs(total - amountToReduce);
}

const increaseByPercentage = (total, percentage) => {
    if (total <= 0) {
        return percentage;
    }
    const amountToReduce = (percentage / 100) * total;
    return abs(total + amountToReduce);
}

const reduceByValue = (total, value) => {
    return abs(total - value);
}

const increaseByValue = (total, value) => {
    return abs(total + value);
}

const abs = (num) => num < 0 ? 0 : num;


module.exports = computeWeight