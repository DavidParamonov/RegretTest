
import Core from "./Core";
import VH from "./VectorHelper";
import Strategy from "./Strategy";

export default class Main {

    Run() {
        var T = 1000;
        var d = 30;
        var R = 10000;

        var core = new Core(T, d);
        core.print();
        var VectorHelper = new VH();
        var products = [];
        var totalProducts = 5;
        var strategy = new Strategy(d, R, T);
        for (var i = 0; i < totalProducts; i++) {
            var p = {
                name: `Product #` + i,
                features: VectorHelper.createRandomVector(d, 1),
            }

            var regret = core.calculateRegret(p.features, strategy);
            var marketPrice = core.market.getMarketPrice(p.features);
            var product = strategy.getProduct(p.features);
          

            p.marketPrice = marketPrice;
            p.product = product;
            p.regret = regret;
            products.push(p)

            var diff = (100 - (product.price / marketPrice) * 100).toFixed(2);
            console.log(`${p.name} regret:${regret.toFixed(2)} market:${marketPrice.toFixed(2)} product:${product.price.toFixed(2)} diff:${diff}% steps:${product.strSteps}`);
        }
        return products;
    }
    
}