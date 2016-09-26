/**
 * @author Pavel Máca <maca.pavel@gmail.com>
 */
class Course {
    protected faculty: string;
    protected number: number;

    protected info: any;

    constructor(faculty, number) {
        this.faculty = faculty;
        this.number = number;
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
}