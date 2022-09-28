var fs = require("fs");
exports.index = (req, res) => {
  var data = fs.readFileSync("student.json");
  console.log(data);
  data = data.toString();
  var Data = JSON.parse(data);
  return res.json(Data);
};

exports.store = (req, res) => {
  console.log(req.body);
  var user = {
    name: req.body.name,
    class: req.body.class,
    rollNo: req.body.rollNo,
  };
  var data = fs.readFileSync("student.json");
  data = data.toString();
  var Data = JSON.parse(data);
  var id = Data.length;

  user["id"] = id + 1;
  console.log("+++", user);
  console.log("---", Data);
  Data.push(user);

  fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
  return res.json(Data);
};

exports.delete = (req, res) => {
  id = req.params.id;
  data = fs.readFileSync("student.json");
  var Data = JSON.parse(data);
  for (var i in Data) {
    console.log(Data);
    if (Data[i] != null) {
      if (Data[i]["id"] == id) {
        delete Data[i];
        fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
        console.log(Data);
        res.json(Data);
      }
    }
  }
};

exports.getid = (req, res) => {
  id = req.params.id;

  mainData = [];
  var data = fs.readFileSync("student.json");
  var Data = JSON.parse(data);
  for (var i in Data) {
    if (Data[i] != null) {
      if (Data[i]["id"] == id) {
        console.log(Data[i]);
        mainData.push(Data[i]);
      }
    }
  }
  res.json(mainData);
};

exports.update = (req, res) => {
  id = req.params.id;
  var user = {
    id: id,
    name: req.body.name,
    rollNo: req.body.rollNo,
    class: req.body.class,
    parentID: req.body.parentID
  };
  data = fs.readFileSync("student.json");
  var Data = JSON.parse(data);
  for (var i in Data) {
    console.log(Data);
    if (Data[i] != null) {
      if (Data[i]["id"] == id) {
        Data[i] = user;
        fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
        console.log(Data);
        res.json(Data);
      }
    }
  }
};

exports.storeNext = (req, res) => {
  var user;
  try {
    console.log(req.body);
    if (req.body.check) {
      var user1 = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
        parentID: req.body.parentID,
      };
    } else {
      user = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
      };
    }
  } catch (err) {
    res.status(500).json({
      err: err,
    });
    console.log("ERROR", err);
  }

  var data = fs.readFileSync("student.json");
  data = data.toString();
  var Data = JSON.parse(data);
  var id = Data.length;
  console.log("ID", id);
  req.body.check ? user1 : (user["id"] = id + 1);
  console.log("+++", req.body.check ? user1 : user);
  console.log("---", Data);
  console.log("Test nextID", req.body.nextID);
  Data.splice(req.body.nextID + 1, 0, req.body.check ? user1 : user);

  fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
  return res.json(Data);
};

exports.storeChild = (req, res) => {
  var user;
  try {
    console.log(req.body);
    // if (req.body.check) {
      var user1 = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
        parentID: req.body.currentID.toString(),
      };

    // } else {
    //   user = {
    //     id: req.body.id,
    //     name: req.body.name,
    //     class: req.body.class,
    //     rollNo: req.body.rollNo,
    //     parentID: req.body.currentID,
    //   };
    // }
  var data = fs.readFileSync("student.json");
  data = data.toString();
  var Data = JSON.parse(data);
  var id = Data.length;
  console.log("ID", id);
  user1["id"] = id + 1;
  console.log("+++", user1);
  console.log("---", Data);
  console.log("Test currentID", req.body.currentID);
  // user.id = user.id.toString();
  // user.parentID = user.parentID.toString();
  Data.splice(req.body.currentID + 1, 0,  user1);

  fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
  return res.json(Data);
  } catch (err) {
    return res.json(err);
    console.log("ERROR", err);
  }
  Object.values(obj)[0]
};


// move Next

exports.moveNext = (req, res) => {
  var user;
  try {
    console.log(req.body);
    if (req.body.check) {
      var user1 = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
        parentID: req.body.parentID,
      };
    } else {
      user = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
      };
    }
  } catch (err) {
    res.status(500).json({
      err: err,
    });
    console.log("ERROR", err);
  }
  console.log("DAta >>>", user1)
  var data = fs.readFileSync("student.json");
  data = data.toString();
  var Data = JSON.parse(data);
  var id = Data.length;
  console.log("ID", id);
  req.body.check ? user1["id"] = id + 1 : user["id"] = id + 1;
  console.log("+++", req.body.check ? user1 : user);
  console.log("---", Data);
  console.log("Test next", req.body.nextt);
  Data.splice(req.body.nextt + 1, 0, req.body.check ? user1 : user);

  fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
  return res.json(Data);
};



// move Child
exports.moveChild = (req, res) => {
  var user;
  try {
    console.log(req.body);
      var user1 = {
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
        parentID: req.body.current.toString(),
      };

  var data = fs.readFileSync("student.json");
  data = data.toString();
  var Data = JSON.parse(data);
  var id = Data.length;
  console.log("ID", id);
  user1["id"] = id + 1;
  console.log("+++", user1);
  console.log("---", Data);
  console.log("Test currentID", req.body.current);
  Data.splice(req.body.current + 1, 0,  user1);

  fs.writeFileSync("student.json", JSON.stringify(Data, null, 2));
  return res.json(Data);
  } catch (err) {
    return res.json(err);
    console.log("ERROR", err);
  }
  Object.values(obj)[0]
};