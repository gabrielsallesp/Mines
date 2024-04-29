import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';
import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplision,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions';

export default class App extends React.Component  <any, any> {

  constructor(props: any) {
    super(props)
    this.state = this.createState()
  }

  // calcula quantidade de minas presentes no tabuleiro
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }
 
  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
       board: createMinedBoard(rows, cols, this.minesAmount()),
       won: false,
       lost: false,
       showLevelSelection: false
    }
  }

  onOpenField = (row: any, column: any) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplision(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Derrota!', 'Mas que falta de sorte!')
    }

    if (won) {
      showMines(board)
      Alert.alert('Parabens!', 'Voce venceu!')
    }

    this.setState({ board, lost, won })
  } 

  onSelectField = (row: any, column: any) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      showMines(board)
      Alert.alert('Vitória!', 'Você venceu a partida!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = (level: number) => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return(
      <SafeAreaView style={styles.container}>

        <LevelSelection isVisible = {this.state.showLevelSelection} 
                        onLevelSelected = {this.onLevelSelected} 
                        onCancel = {() => this.setState({showLevelSelection: false})}/>

        <Header flagsLeft = {this.minesAmount() - flagsUsed(this.state.board)} 
                onNewGame = {() => this.setState(this.createState())} 
                onFlagPress = {() => this.setState({showLevelSelection: true})}/>

        <View style={styles.board}> 
          <MineField board={this.state.board}
              onOpenField={this.onOpenField}
              onSelectField={this.onSelectField}/>
        </View>
      </SafeAreaView>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },

})