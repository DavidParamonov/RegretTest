import Market from "./Market";
import FeaturesFactory from "./FeaturesFactory";

export default class MarketFactory {

    constructor() {
        this.ff = new FeaturesFactory();
    }

    createMarket(d) {
        var market = new Market(this.ff.createLinearFeatures(d, 2));
        return market;
    }
}