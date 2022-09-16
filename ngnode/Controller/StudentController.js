var fs = require('fs');
exports.index=(req,res)=>{
    var data=fs.readFileSync("student.json") 
    console.log(data)
    data = data.toString();
    var Data = JSON.parse( data );
    return res.json(Data);

}

exports.store=(req,res)=>{
    console.log(req.body);
var user = 
{
       name : req.body.name,
       class : req.body.class,
       roll_no : req.body.roll_no
}
 var data=fs.readFileSync("student.json") 
 data = data.toString();
 var Data = JSON.parse( data );
 var id=Data.length;

 user["id"]=id+1;
 console.log('+++',user);
 console.log('---',Data);
 Data.push(user);

 fs.writeFileSync("student.json",JSON.stringify(Data,null,2))
 return res.json(Data)
}


exports.delete=(req,res)=>{
    id=req.params.id
    data=fs.readFileSync("student.json")
    var Data=JSON.parse(data);
    for (var i in Data){
        console.log(Data);
        if(Data[i] != null){
            if(Data[i]["id"]==id){
                delete Data[i]
                fs.writeFileSync("student.json",JSON.stringify(Data,null,2))
                console.log(Data)
                res.json(Data)
            };
        }
    };
};

exports.getid=(req,res)=>{
    id=req.params.id;
  
    mainData=[];
    var data=fs.readFileSync("student.json")
    var Data=JSON.parse(data)
    for (var i in Data){
        if(Data[i] != null){
        if (Data[i]["id"]==id){
            console.log(Data[i]);
            mainData.push(Data[i]);
        }
    }
    }res.json(mainData);
};


exports.update=(req,res)=>{
    id=req.params.id;
    var user = 
    {
           name : req.body.name,
           class : req.body.class,
           roll_no : req.body.roll_no,
           id      : id
    }
    data=fs.readFileSync("student.json")
    var Data=JSON.parse(data);
    for (var i in Data){
    console.log(Data);
        if(Data[i] != null){
        if(Data[i]["id"]==id){
            Data[i]=user;
            fs.writeFileSync("student.json",JSON.stringify(Data,null,2))
            console.log(Data)
            res.json(Data)
        };
    }
    };
};
// app.post('/addNext-Student',StudentController.next);

exports.storeNext=(req,res)=>{
    console.log(req.body);
var user = 
{
       name : req.body.name,
       class : req.body.class,
       roll_no : req.body.roll_no
}
 var data=fs.readFileSync("student.json") 
 data = data.toString();
 var Data = JSON.parse( data );
 var id=Data.nextID;

 user["nextID"]=id+1;
 console.log('+++',user);
 console.log('---',Data);
//  Data.join()
 Data.push(user);   

 fs.writeFileSync("student.json",JSON.stringify(Data,null,2))
 return res.json(Data)
}

exports.storeChild=(req,res)=>{
    console.log(req.body);
var user = 
{
       name : req.body.name,
       class : req.body.class,
       roll_no : req.body.roll_no,
       parentID : req.body.parentID
}
 var data=fs.readFileSync("student.json") 
 data = data.toString();
 var Data = JSON.parse( data );
 var id=Data.length;

 user["id"]=id+1;
 console.log('+++',user);
 console.log('---',Data);
 Data.push(user);

 fs.writeFileSync("student.json",JSON.stringify(Data,null,2))
 return res.json(Data)
}

