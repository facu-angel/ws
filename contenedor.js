class Libreria {
    constructor(){
        this.id = 0
        this.array = []
    }
    insert(objeto){
        objeto.id = ++this.id
        this.array.push(objeto)
    }
}
module.exports = Libreria