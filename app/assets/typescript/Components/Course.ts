/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class Course {
    protected faculty: string;
    protected number: number;

    protected subfix : string;

    protected info: any;

    constructor(faculty, number, suffix) {
        this.faculty = faculty;
        this.number = number;
        this.subfix = suffix;
    }

    toString(): string {
        return this.faculty + '/' + this.number;
    }

    public setInfo(data){
        this.info = data;
    }


    public getName():string{
        return this.info['nazev'];
    }

    public getCode(){
        return this.toString();
    }

    public getSuffix(){
        return this.subfix;
    }

}