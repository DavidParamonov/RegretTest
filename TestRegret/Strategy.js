
import VectorHelper from "./VectorHelper";
import { Array } from "core-js";
var VectorHelperInst = new VectorHelper();
export default class Strategy {

    constructor(d, R, T) {
        this.d = d;
        this.R = R;
        this.T = T;
        this.products = {};
        this.name = "simple ";
        this.findStr = "explore first";
        this.e = Math.log2(T) / T;

        Array.__proto__.norm = function (p = 1) {
            return Math.pow(this.reduce((a, i) => { return Math.pow(Math.abs(a + i), p); }), 1 / p);
        }

    }

    __initUncertanySet(productFetures) {
        var r = {};
        r.lowerPhi = productFetures;
        r.upperPhi = VectorHelperInst.multiplayScalar(productFetures, this.R );// ||PHI||2 <= R
        r.currentPhi = r.upperPhi;
        return r;
    }

    getProduct(product) {
        var p = this.products[product];
        if (p == null)
            p = this.products[product] = {
                product: product,
                set: this.__initUncertanySet(product),
                strSteps: 0,
            };
        p.price = VectorHelperInst.mul(product, p.set.currentPhi).norm();
        p.phi = p.set.currentPhi;
        return p;
    }

    print() {
        let msg = `Strategy: ${this.name}`;
    }

    applay(product, phi, accepted) {
        var o = this.products[product];
        if (!o) return;
        var nextPhi = VectorHelperInst.subtract(o.set.upperPhi, o.set.lowerPhi);

        if (VectorHelperInst.vectorLen(nextPhi) > this.e) {//threshold
            o.strSteps++;
            if (accepted)
                o.set.lowerPhi = phi;
            else
                o.set.upperPhi = phi;

            nextPhi = VectorHelperInst.subtract(o.set.upperPhi, o.set.lowerPhi);
            nextPhi = VectorHelperInst.multiplayScalar(nextPhi, 0.5);
            o.set.currentPhi = VectorHelperInst.add(o.set.lowerPhi, nextPhi);
        } else {
            if (!accepted)
                o.set.currentPhi = o.set.lowerPhi;
        }
    }
}