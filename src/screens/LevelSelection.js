import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";

export default props => {
    return (
        <Modal onRequestClose = {props.onCancel}
               visible = {props.isVisible}
               animationType = "fade" transparent = {true}>

            <View style = {styles.frame}>
                <View style = {styles.container}>
                    <Text style = {styles.title}>Difficult</Text>
                    
                    <TouchableOpacity style = {[styles.button]} 
                        onPress = {() => props.onLevelSelected(0.1)}>
                        <Text style = {styles.buttonLabel}>Easy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {[styles.button]} 
                        onPress = {() => props.onLevelSelected(0.2)}>
                        <Text style = {styles.buttonLabel}>Normal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {[styles.button]} 
                        onPress = {() => props.onLevelSelected(0.3)}>
                        <Text style = {styles.buttonLabel}>Hard</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#a9bbb5'
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})