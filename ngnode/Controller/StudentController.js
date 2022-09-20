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
       rollNo : req.body.rollNo
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
           rollNo : req.body.rollNo,
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


exports.storeNext=(req,res)=>{
    console.log(req.body);
var user = 
{
       name : req.body.name,
       class : req.body.class,
       rollNo : req.body.rollNo
}
 var data=fs.readFileSync("student.json") 
 data = data.toString();
 var Data = JSON.parse( data );
 var id=Data.length;

 user["id"]=id+1;
 console.log('+++',user);
 console.log('---',Data);
 console.log("Test nextID",req.body.nextID)
 Data.splice(req.body.nextID+1, 0, user)

 fs.writeFileSync("student.json",JSON.stringify(Data,null,2))
 return res.json(Data)
}

exports.storeChild=(req,res)=>{
    console.log(req.body);
var user = 
{
       name : req.body.name,
       class : req.body.class,
       rollNo : req.body.rollNo
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


