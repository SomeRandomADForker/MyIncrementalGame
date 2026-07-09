/**
 * @param {import("./index").default} dcNumber
 */
function format(dcNumber) {
    if (!(dcNumber instanceof Decimal)) {
        dcNumber = new Decimal(dcNumber);
    }
    
    // < 1.00e6 (1,000,000)
    if (dcNumber.lt(new Decimal("1e6"))) {
        return dcNumber.toFixed(2);
    }
    // > 1.00e6 (1,000,000) and < 1.00e1,000,000,000 (1.00e1.000e9)
    else if (dcNumber.gte(new Decimal("1e6")) && dcNumber.lt(new Decimal("1e1000000000"))) {
        return dcNumber.toExponential(2).replace(/\+/g, "");
    }
    // > 1.00e1.000e9
    else {
        let exponent = dcNumber.e;

        let formattedExponent = format(exponent);

        return dcNumber.m.toFixed(2) + "e" + formattedExponent;
    }
}