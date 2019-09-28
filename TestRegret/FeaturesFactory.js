export default class FeaturesFactory {

    createLinearFeatures(n, d = 2) {
        var me = this;
        return me.__createFeatures(n, function (phi, i) {
            return me.__createLinearyFunction((a) => { return n - a + a % d }, (b) => { return b * 1.75 })(phi, i);
        });
    }

    __createFeatures(n, featuresFunction) {
        let features = []
        for (let i = 0; i < n; i++) {
            let currentFeature = function (phi) {
                return featuresFunction(phi, n - i);
            }
            features.push(currentFeature);
        }
        return features;
    }

    __createLinearyFunction(aFunc, bFunc) {
        return function (xi, i) {
            return xi * aFunc(i) + bFunc(i);
        }
    }
}