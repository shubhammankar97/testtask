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
    console.log("currentID for inserting column at next index",req.body.currentColID)
    var data = fs.readFileSync("column.json")
    data = data.toString();
    var Data = JSON.parse(data);
    var id = Data.length;
    user["id"] = id + 1;
    console.log('+++', user);
    console.log('---', Data);
    // Data.push(user);
    Data.splice(req.body.currentColID + 1, 0,  user);


    fs.writeFileSync("column.json", JSON.stringify(Data, null, 2))
    return res.json(Data)
}
exports.delete = (req, res) => {
  const  id = req.params.id
    console.log(id)
    data = fs.readFileSync("column.json")
    data = data.toString();
    var Data = JSON.parse(data)
    console.log('+++45',Data);
    for (var i in Data) {
        console.log(Data);
        if (Data[i] != null) {

            if (Data[i]["id"] == id) {
                // var field_name=Data[i]["field"]
                // console.log(field_name)
                // var stu_data = fs.readFileSync("student.json");
                // stu_data = stu_data.toString();
                // var Stu_Data = JSON.parse(stu_data);
                // for (var f in Stu_Data) {
                //     console.log(Stu_Data[f][field_name])
                //     delete Stu_Data[f][field_name]
                // }
                
                // fs.writeFileSync("student.json", JSON.stringify(Stu_Data, null, 2))
                // console.log(Stu_Data)
                //  delete Data[i] 
                Data.splice(i,1)  
                fs.writeFileSync("column.json", JSON.stringify(Data, null, 2))
                console.log(Data)  
                res.json(Data)                         
                
         

            };
        }
    };
};