import { Dimensions } from "react-native";

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,

    headerRatio: 0.2, // porcentagem representa o espaco em tela que o cabecalho ira ocupar
    difficultLevel: 0.1, // percentual em cima da quantidade de minas - 10%

    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount(){
        const totalHieght = Dimensions.get('window').height 
        const boardHieght = totalHieght * (1 - this.headerRatio) 
        return Math.floor(boardHieght / this.blockSize)
    }
}

export default params