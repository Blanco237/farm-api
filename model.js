const computeWeight = require('./utils/computeWeight');

const tf = require('@tensorflow/tfjs');
const trainingData = require('./data.json');
require('tfjs-node-save');

class Model {
    constructor(data) {
        if (data) {
            this.trainingData = data;
        }
        else {
            this.trainingData = trainingData
        }


    }

    async init() {
        try {
            this.model = await this.load();
            console.log("Here first")
            console.log(this.model);
            if (!this.model) {
                console.log("Here")
                this.model = tf.sequential();
            }
        }
        catch(e) {
            console.log(e);
            this.model = tf.sequential();
        }
    }

    train() {
        const BATCH_SIZE = this.trainingData.length;
        const INP_SHAPE = this.trainingData[0].data.length

        this.model.add(tf.layers.dense({ units: INP_SHAPE, inputShape: [INP_SHAPE], batchSize: BATCH_SIZE }))
        this.model.add(tf.layers.dense({ units: 12, activation: 'relu6' }));
        this.model.add(tf.layers.dense({ units: 8, activation: 'relu6' }));

        const data = tf.tensor2d(this.trainingData.map((d) => d.data));
        const labels = tf.tensor2d(this.trainingData.map((d) => d.label));

        this.model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        this.model.fit(data, labels, {
            batchSize: BATCH_SIZE,
            shuffle: true,
            epochs: 200,
            callbacks: {
                // onEpochEnd: (epoch, logs) => console.log(`Epoch:${epoch} - Loss:${logs.loss}`)
            }
        });

        this.save();
    }

    transformPrediction(prediction) {
        const keyVArr = [[0, "BEANS"], [1, "TOMATOES"], [2, "CORN"], [3, "YAM"], [4, "POTATOES"], [5, "COMPOST"], [6, "WATER"], [7, "LIME"]];
        const valueMap = new Map(keyVArr);

        const item = {}
        prediction.forEach((val, index) => {
            console.log(`${valueMap.get(index)} - ${val}`);
            if (Math.floor(val) >= 1) {
                const t = valueMap.get(index);
                item[t] = index > 4 ? Math.round(val) : true;
            }
        })

        return item;
    }

    predict(data) {
        const output = this.model.predict(tf.tensor2d(data, [1, 15]));
        const result = Array.from(output.dataSync());
        return result;
    }

    genCalendar(_data) {
        let data = Array.from(_data);
        const date = new Date();
        const calendar = [];
        for (let i = 0; i < 12; i++) {
            const month = date.toLocaleString('default', { month: 'long' });
            const prediction = this.predict(data);
            const transformedPrediction = this.transformPrediction(prediction);
            transformedPrediction.month = month;
            date.setMonth(date.getMonth() + 1, 1);
            data = computeWeight(data, transformedPrediction);
            calendar.push(transformedPrediction);
        }

        return calendar;
    }

    async save() {
        await this.model.save("file://./model");
    }

    async load() {
        console.log("Loading Model");
        this.model = await tf.loadLayersModel("file://./model/model.json")
    }

}

module.exports = Model;