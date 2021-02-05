const outputBlock = document.getElementById('output');
const btn = document.getElementsByName('btn')[0];

const f = (x, y) => Math.abs(x * y);

const getXY = (a, b, n) => {
    const delta = Math.abs(b - a) / n;

    let data = [];

    for (let i = a; i <= b; i += delta) 
        data.push(i);

    return data;
};

const getZ = (x, y) => {
    let data = [];
    let value;

    for (let i = 0; i < x.length; i++) {
        let temp = [];
        for (let j = 0; j < y.length; j++) {
            value = f(x[i], y[j]);
            temp.push(value);
        }
        data.push(temp);
    }
    
    return data;
};

const parenthesisCheck = (expr) => {
    let countL1 = 0;
    let countR1 = 0;

    let countL2 = 0;
    let countR2 = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == "(") countL1++;    
        if (expr[i] == ")") countR1++;
    }

    const flag = countL1 == countR1 != 0;

    return flag;
}

const getParsedExpression = (expr) => {
    console.log(`Initial expression: ${expr}`);

    const parCheck = parenthesisCheck(expr);
    console.warn(parCheck);

    return 0;
}

btn.addEventListener('click', () => {

    const a = Number(document.getElementsByTagName('input')[1].value);
    const b = Number(document.getElementsByTagName('input')[2].value);
    const n = Number(document.getElementsByTagName('input')[3].value);

    let func = document.getElementsByTagName('input')[0].value;
        func = getParsedExpression(func);

    const o_size_w = 850;
    const o_size_h = 850;
    const o_opacity = 0.75;
    const o_autosize = false;
    const o_title = 'z = f(x, y) = abs(x * y)';
    const o_xtitle = 'X';
    const o_ytitle = 'Y';
    const o_ztitle = 'Z';
    const o_type = 'surface';

    const x0 = getXY(a, b, n);
    const y0 = getXY(a, b, n);
    const z0 = getZ(x0, y0);

    const data_z = {
        x: x0,
        y: y0,
        z: z0, 
        type: o_type,
        opacity: o_opacity
    };

    const layout = {
        title: o_title,
        scene: {
            xaxis: {title: o_xtitle},
            yaxis: {title: o_ytitle},
            zaxis: {title: o_ztitle}
        },
        autosize: o_autosize,
        width: o_size_w,
        height: o_size_h,
    };

    Plotly.newPlot(outputBlock, [data_z], layout);
});