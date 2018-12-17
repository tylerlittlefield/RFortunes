import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SQLite, FileSystem, Asset } from 'expo';

// load the database
FileSystem.downloadAsync(
  Asset.fromModule(require("../assets/db/fortunes.sqlite")).uri,
  `${FileSystem.documentDirectory}SQLite/test.sqlite`
)

const db = SQLite.openDatabase("test.sqlite")

// render the forward action button that displays a random quote
class Buttons extends Component {

  // special thanks to f_youngblood#1697 for this one
  state = {
    quote: '',
    author: '',
    context: '',
    source: '',
    date: ''
  }

  fetchQuote = (rows) => {
    // const message = JSON.stringify(rows)
    const quote = rows._array[0].quote
    const author = rows._array[0].author
    const context = rows._array[0].context
    const source = rows._array[0].source
    const date = rows._array[0].date
    
    this.setState({quote})
    this.setState({author})
    this.setState({context})
    this.setState({source})
    this.setState({date})
  }

  RandQuote = () => {
    console.log("About to open SQLite database...")
    db.transaction(
      tx => {
        tx.executeSql(
          // https://stackoverflow.com/questions/2279706
          `SELECT * FROM fortunes ORDER BY RANDOM() LIMIT 1`,
          [],
          (_, {rows}) => this.fetchQuote(rows),
          (txObj, error) => alert(error)
        )
      },
      error => console.log("Something went wrong:" + error),
      () => console.log("Database transaction is a success!")
    )
  }

  render() {
    return (
      <View style={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between'}}>
        <Text style={styles.quoteText}>
          {this.state.quote}{"\n\n"}
          {this.state.author}{"\n\n"}
          {this.state.context}{"\n\n"}
          {this.state.source}{"\n\n"}
          {this.state.date}
        </Text>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item 
            buttonColor='#00695C' 
            title="" 
            onPress={()=>this.RandQuote()}>
              <Icon 
                name="navigate-next" 
                style={styles.actionButtonIcon} 
              />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

// style sheet
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  quoteText: {
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    fontStyle: "italic",
    textAlign: 'center'
  }
});

export default Buttons;