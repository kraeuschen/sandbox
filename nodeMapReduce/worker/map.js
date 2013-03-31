var mapreduce = require('mapred')(),
    fs = require('fs');

var fileName = './sources/pg76.txt';

var inputFormat = function(fileName) {
    var inputSplits = [];

    var data = fs.readFileSync(fileName, 'ascii');
    if(data) {
        var chunks = data.split(/\r?\n/);

        for(var i = 0; i < chunks.length; ++i) {
            inputSplits.push([i, chunks[i]]);
        }
    }

    return inputSplits;
};

information = inputFormat(fileName);

var map = function(key, value){
    var list = [], aux = {};
    value = value.toLowerCase().split(/\W+/g);

    value.forEach(function(w){
        aux[w] = (aux[w] || 0) + 1;
    });

    for(var k in aux){
        list.push([k, aux[k]]);
    }

    return list;
};

var reduce = function(key, values){
    var sum = 0;
    values.forEach(function(e){
        sum += e;
    });
    return sum;
};

mapreduce(information, map, reduce, function(result){
    console.log(result);
});
