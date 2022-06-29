export class Student {
    
    get ID() {
        return this.id;
    }
    set ID(val) {
        this.id = val;
    }

    get StudentName() {
        return this.name;
    }
    set StudentName(val) {
        this.name = val;
    }

    get RollNumber() {
        return this.roll_no;
    }
    set RollNumber(val) {
        this.roll_no = val;
    }
    get Class() {
        return this.class;
    }
    set Class(val) {
        this.class = val;
    }
    get ParentID() {
        return this.parentID;
    }
    set ParentID(val) {
        this.class = val;
    }

    private id: number;
    private name: string;
    private roll_no: number;
    private class: number;
    private parentID: number;

    constructor() {
        this.id = 0;
        this.name = "";
        this.roll_no = 101;
        this.class = 0;
        this.parentID = 1
    }
}
