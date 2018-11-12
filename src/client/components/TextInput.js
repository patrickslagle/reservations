import React from 'react';
import { TextInput, StyleSheet } from 'react-native'

class TxtInput extends React.PureComponent {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder={this.props.placeholderText}
        autoCapitalize="words"
        autoCorrect={false}
        placeholderTextColor='gray'
        onChangeText={inputText => this.props.onChangeText(this.props.inputName, inputText)}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    borderRadius: 14
  }
})

export default TxtInput;
