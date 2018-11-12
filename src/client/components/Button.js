import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native'

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'dodgerblue',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  }
})
class Button extends React.PureComponent {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button;
