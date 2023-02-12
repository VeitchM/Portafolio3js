export default class tupleIdText{
    constructor(id,text){
        this.id=id
        this.text=text
    }

    applyTranslation(document){
        document.getElementById(this.id).innerHTML = this.text   
    }

}