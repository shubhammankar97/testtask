var fs = require('fs');
exports.index = (req, res) => {
    var data = fs.readFileSync("column.json")
    console.log(data);
    data = data.toString();

    for (i = 0; i < data.length; i++) {
        data.id = i;
    }
    var Data = JSON.parse( data );
    console.log(Data);
    return res.json(Data);
    // 
    
    return res.json(Data);
}

exports.store = (req, res) => {
    console.log(req.body);
    var user = {
        field: req.body.field,
        type: req.body.type
    }

    var data = fs.readFileSync("column.json")
    data = data.toString();
    var Data = JSON.parse(data);
    var id = Data.length;
    user["id"] = id + 1;
    console.log('+++', user);
    console.log('---', Data);
    Data.push(user);

    fs.writeFileSync("column.json", JSON.stringify(Data, null, 2))
    return res.json(Data)
}
exports.delete = (req, res) => {
    id = req.params.id
    data = fs.readFileSync("column.json")
    var Data = JSON.parse(data);
    for (var i in Data) {
        console.log(Data);
        if (Data[i] != null) {
            if (Data[i]["id"] == id) {
                delete Data[i]
                fs.writeFileSync("column.json", JSON.stringify(Data, null, 2))
                console.log(Data)
                res.json(Data)
            };
        }
    };
};