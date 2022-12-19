// Beans | Tomatoes | Corn | Yam | Potatoes | compost | water | lime
const keyVArr = [[0, "BEANS"], [1, "TOMATOES"], [2, "CORN"], [3,"YAM"], [4, "POTATOES"], [5, "COMPOST"], [6, "WATER"], [7, "LIME"]];

const valueMap = new Map(keyVArr);

const test = [1.7148385, 0, 3.1977334, 0, 0, 0, 1.6769778, 0];

const transformPrediction = (prediction) => {
    const item = {}
    prediction.forEach((val, index) => {
        if(Math.round(val) > 1){
            const t = valueMap.get(index);
            item[t] = index > 4 ? Math.round(val) : true;
        }
    })

    return item;
}

console.log(transformPrediction(test));