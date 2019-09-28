export default class VectorHelper {
    createRandomVector(n, l2NormUpperBound = 1) {
        let v = [];
        let maxValue = l2NormUpperBound / Math.sqrt(n);
        for (let i = 0; i < n; i++)
            v.push(Math.random() * maxValue);
        return v;
    }

    createVector(n, init = 0) {
        let v = [];
        for (let i = 0; i < n; i++ , v.push(init));
        return v;
    }

    normVector(v) {
        var ret = [];
        var len = this.vectorLen(v);        
        for (let i = 0; i < v.length; i++ ) {
            if (v[i] == 0) ret.push(0);
            else ret.push(v[i] / len);
        }
        return ret;

    }

    __processVectors(a, b, func) {
        var ret = [];
        for (let i = 0; i < a.length && b.length; i++) {
            ret.push(func(a[i],b[i]));
        }
        return ret;
    }

    subtract(a, b) {
        return this.__processVectors(a, b, (a, b) => { return a-b });
    }

    add(a, b) {
        return this.__processVectors(a, b, (a, b) => { return a + b });
    }

    mul(a, b) {
        return this.__processVectors(a, b, (a, b) => { return a * b });
    }

    multiplayScalar(a, x) {
        var ret = [];
        for (let i = 0; i < a.length; i++) {
            ret.push(a[i] * x);
        }
        return ret;
    }

    vectorLen(v) {
        var qSumm = 0;
        for (let i = 0; i < v.length; qSumm += Math.pow(v[i], 2), i++ );
        return Math.sqrt(qSumm);
    }

    L2Norm(v) {
        return this.vectorLen(v);
    }
}