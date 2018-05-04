import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import importedEmojis from '../utils/emoji';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Guess the meaning of the following emoji phrase',
      emojis: [],
      randomQuestion: 0,
      score: 0,
      guess: ''
    };

    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkGuess = this.checkGuess.bind(this);
  }

  restartGame() {
    let emojisArr = importedEmojis.slice();
    let randomQuestion = this.pickRandomQuestion(emojisArr);
    this.setState({
      emojis: emojisArr,
      randomQuestion,
      score: 0,
      header: 'Guess the meaning of the following emoji phrase',
      guess: ''
    });
  }

  pickRandomQuestion(array) {
    return Math.floor(Math.random() * array.length);
  }

  handleChange(guess) {
    this.setState({ guess });
  }

  checkGuess() {
    let { guess, score, header, emojis, randomQuestion } = Object.assign(
      {},
      this.state
    );
    guess = guess.replace(/\W/g, '').toLowerCase();
    let answer = emojis[randomQuestion].answer.replace(/\W/g, '').toLowerCase();

    if (guess === answer) {
      score += 10;
      header = 'Correct! Here is your next phrase';
      emojis.splice(randomQuestion, 1);
      randomQuestion = this.pickRandomQuestion(emojis);
    } else {
      header = 'Try Again';
    }

    this.setState({
      guess: '',
      score,
      header,
      randomQuestion,
      emojis
    });

    console.log(this.state.emojis);
  }

  componentDidMount() {
    this.restartGame();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.header}</Text>
        <Text>
          {this.state.emojis.length &&
            this.state.emojis[this.state.randomQuestion].question}
        </Text>
        <TextInput
          onChangeText={guess => this.handleChange(guess)}
          value={this.state.guess}
          placeholder="Guess the Phrase!"
        />
        <Button onPress={this.checkGuess} title="Check Guess" />
        <Text>Score: {this.state.score}</Text>
        <Button onPress={this.restartGame} title="Restart Game" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#AAA',
    justifyContent: 'center'
  }
});
