export default class Market {
    constructor(features) {
        this.features = features;
    }

    getMarketPrice(x) {
        var result = 0;
        for (let i = 0; i < x.length && i < this.features.length; i++)
            result += this.features[i](x[i]);
        return result;
    }
}