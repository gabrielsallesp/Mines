import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import params from "../params";
import Mines from "./Mines";
import Flag from "./Flag";
 
export default props => {

    const { mined, opened, nearMines, exploded, flagged} = props
    const styleField = [styles.field]
    
    // coloca o estilo caso esteja aberto
    if (opened) styleField.push(styles.opened)

    // aplica estilo caso tenha sido explidido
    if (exploded) styleField.push(styles.exploded)

    // aplica estilo caso tenha bandeira
    if (flagged) styleField.push(styles.flagged)

    // caso nao tenha nenhum estilo definido, e campo é regular
    if (!opened && !exploded) styleField.push(styles.regular)

    // calcula quantas minas tem ao redor do campo, definindo assim a cor de perigo
    let color = null 
    if (nearMines > 0) {
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#2B520F'
        if (nearMines > 2 && nearMines < 6) color = '#F9060A'
        if (nearMines >= 6) color = '#F221A9'
    }

    return (
        <TouchableWithoutFeedback onPress = {props.onOpen} onLongPress = {props.onSelect}>

            <SafeAreaView style = {styleField}>
                { !mined && opened && nearMines > 0 ? 
                // apresenta a quantidade de minas no campo
                    <Text style = {[styles.label, {color: color}]}>
                        {nearMines}
                    </Text> 
                : false } 

                { mined && opened ? <Mines/> : false }
                { flagged && !opened ? <Flag/> : false }
            </SafeAreaView>

        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize 
    },

    regular: {
        backgroundColor: '#999', 
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: "center",
        justifyContent: "center", 
    },

    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    }, 

    label: {
        fontWeight: "bold",
        fontSize: params.fontSize
    }
})