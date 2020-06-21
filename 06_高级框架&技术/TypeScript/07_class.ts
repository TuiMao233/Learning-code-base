class City {
    cName: string = ''
    cLevel: number
    constructor(cName: string, cLevel:number) {
        this.cName = cName
        this.cLevel = cLevel
    }
    about () {
        console.log(`兄嘚，你跳【${this.cName}】~此地危险系数为: 【${this.cLevel}】`);  
    }
}
const citv:object = new City('p城', 5)