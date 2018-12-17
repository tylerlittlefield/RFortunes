import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Buttons, FadeInView } from './components';

export default class App extends React.Component {
  render() {
    return (
      <FadeInView style={{flex: 1}}>
        <Text style={styles.titleText}>R Fortunes</Text>
        <Text style={styles.baseText}>Fortunes from the R community</Text>
        <Buttons/>
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  baseText: {    
    fontFamily: 'System',
    fontSize: 18,    
    textAlign: 'center'
  },
  titleText: {
    paddingTop: 50,
    fontFamily: 'System',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
