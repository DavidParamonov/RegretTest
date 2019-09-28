
import MarketFactory from "./MarketFactory";

export default class Core {

    constructor(T, d) {
        this.T = T;
        this.d = d;
        this.e = Math.log2(T) / T;
        this.market = new MarketFactory().createMarket(d);
    }

    calculateRegret(product, strategy) {//product's features vector
        //Summ from 0 to T RealMarket volume - accepted value
        var totalRegret = 0;
        var marketPrice = this.market.getMarketPrice(product);
               
        for (var i = 0; i < this.T; i++) {    
            var p = strategy.getProduct(product);
            var accepted = marketPrice >=  p.price;
            totalRegret += marketPrice - (accepted ? p.price : 0);
            strategy.applay(product, p.phi, accepted);
        }
        return totalRegret;
    }

    print() {
        console.log(`Start. d= ${this.d} T = ${this.T}   e = ${this.e}`);
    }
}