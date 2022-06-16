
let order = JSON.stringify([
    {
       "OrderID":10248,
       "CustomerID":"VINET",
       "CustomerName": "Maria ",
       "OrderDate":"1996-07-04T00:00:00.000Z",
       "ShippedDate":"1996-07-16T00:00:00.000Z",
       "Freight":32.38,
       "ShipName":"Vins et alcools Chevalier",
       "ShipAddress":"59 rue de l'Abbaye",
       "ShipCity":"Reims",
       "ShipRegion":null,
       "ShipCountry":"France"
    },
    {
       "OrderID":10249,
       "CustomerID":"TOMSP",
       "CustomerName": "Ana Trujillo",
       "OrderDate":"1996-07-05T00:00:00.000Z",
       "ShippedDate":"1996-07-10T00:00:00.000Z",
       "Freight":11.61,
       "ShipName":"Toms Spezialitäten",
       "ShipAddress":"Luisenstr. 48",
       "ShipCity":"Münster",
       "ShipRegion":null,
       "ShipCountry":"Germany"
    },
    {
       "OrderID":10250,
       "CustomerID":"HANAR",
       "CustomerName": "Antonio Moreno",
       "OrderDate":"1996-07-08T00:00:00.000Z",
       "ShippedDate":"1996-07-12T00:00:00.000Z",
       "Freight":65.83,
       "ShipName":"Hanari Carnes",
       "ShipAddress":"Rua do Paço, 67",
       "ShipCity":"Rio de Janeiro",
       "ShipRegion":"RJ",
       "ShipCountry":"Brazil"
    },
    {
       "OrderID":10251,
       "CustomerID":"VICTE",
       "CustomerName": "Thomas Hardy",
       "OrderDate":"1996-07-08T00:00:00.000Z",
       "ShippedDate":"1996-07-15T00:00:00.000Z",
       "Freight":41.34,
       "ShipName":"Victuailles en stock",
       "ShipAddress":"2, rue du Commerce",
       "ShipCity":"Lyon",
       "ShipRegion":null,
       "ShipCountry":"France"
    },
    {
       "OrderID":10252,
       "CustomerID":"SUPRD",
       "CustomerName": "Christina Berglund",
       "OrderDate":"1996-07-09T00:00:00.000Z",
       "ShippedDate":"1996-07-11T00:00:00.000Z",
       "Freight":51.3,
       "ShipName":"Suprêmes délices",
       "ShipAddress":"Boulevard Tirou, 255",
       "ShipCity":"Charleroi",
       "ShipRegion":null,
       "ShipCountry":"Belgium"
    },
    {
       "OrderID":10253,
       "CustomerID":"HANAR",
       "CustomerName": "Hanna Moos",
       "OrderDate":"1996-07-10T00:00:00.000Z",
       "ShippedDate":"1996-07-16T00:00:00.000Z",
       "Freight":58.17,
       "ShipName":"Hanari Carnes",
       "ShipAddress":"Rua do Paço, 67",
       "ShipCity":"Rio de Janeiro",
       "ShipRegion":"RJ",
       "ShipCountry":"Brazil"
    },
    {
       "OrderID":10254,
       "CustomerID":"CHOPS",
       "CustomerName": "Frédérique Citeaux",
       "OrderDate":"1996-07-11T00:00:00.000Z",
       "ShippedDate":"1996-07-23T00:00:00.000Z",
       "Freight":22.98,
       "ShipName":"Chop-suey Chinese",
       "ShipAddress":"Hauptstr. 31",
       "ShipCity":"Bern",
       "ShipRegion":null,
       "ShipCountry":"Switzerland"
    },
    {
       "OrderID":10255,
       "CustomerID":"RICSU",
       "CustomerName": "Martín Sommer",
       "OrderDate":"1996-07-12T00:00:00.000Z",
       "ShippedDate":"1996-07-15T00:00:00.000Z",
       "Freight":148.33,
       "ShipName":"Richter Supermarkt",
       "ShipAddress":"Starenweg 5",
       "ShipCity":"Genève",
       "ShipRegion":null,
       "ShipCountry":"Switzerland"
    },{
        "OrderID":10265,
        "CustomerID":"BLONP",
        "CustomerName": "Ann Devon",
        "OrderDate":"1996-07-25T00:00:00.000Z",
        "ShippedDate":"1996-08-12T00:00:00.000Z",
        "Freight":55.28,
        "ShipName":"Blondel père et fils",
        "ShipAddress":"24, place Kléber",
        "ShipCity":"Strasbourg",
        "ShipRegion":null,
        "ShipCountry":"France"
     },
     {
        "OrderID":10266,
        "CustomerID":"WARTH",
        "CustomerName": "Roland Mendel",
        "OrderDate":"1996-07-26T00:00:00.000Z",
        "ShippedDate":"1996-07-31T00:00:00.000Z",
        "Freight":25.73,
        "ShipName":"Wartian Herkku",
        "ShipAddress":"Torikatu 38",
        "ShipCity":"Oulu",
        "ShipRegion":null,
        "ShipCountry":"Finland"
     },
     {
        "OrderID":10267,
        "CustomerID":"FRANK",
        "CustomerName": "Aria Cruz",
        "OrderDate":"1996-07-29T00:00:00.000Z",
        "ShippedDate":"1996-08-06T00:00:00.000Z",
        "Freight":208.58,
        "ShipName":"Frankenversand",
        "ShipAddress":"Berliner Platz 43",
        "ShipCity":"München",
        "ShipRegion":null,
        "ShipCountry":"Germany"
     },
     {
        "OrderID":10268,
        "CustomerID":"GROSR",
        "CustomerName": "Diego Roel",
        "OrderDate":"1996-07-30T00:00:00.000Z",
        "ShippedDate":"1996-08-02T00:00:00.000Z",
        "Freight":66.29,
        "ShipName":"GROSELLA-Restaurante",
        "ShipAddress":"5ª Ave. Los Palos Grandes",
        "ShipCity":"Caracas",
        "ShipRegion":"DF",
        "ShipCountry":"Venezuela"
     }]);
    
    export const orderDetails: Object[] = JSON.parse(order, (field, value) => {
    let dupValue = value;
    if (typeof value === 'string' && /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
        let arr = dupValue.split(/[^0-9]/);
        value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 
        parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10));
    }
    return value;
});
