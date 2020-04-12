import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";

// ex) fetch('https://mywebsite.com/mydata.json');

const API_ENDPOINT = "https://reactnative.dev/movies.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  componentDidMount() {
    return fetch(API_ENDPOINT) // Step 1: I'm gonna go to this endpoint.
      .then((response) => {
        return response.json(); // Step 2: If I reach the endpoint, I will return a response.
      })
      .then((json) => {
        console.log(json.movies); // Step 3: If the response has a JSON (readable) format, I will print out what I see.
        this.setState({
          data: json.movies,
        });
      })
      .catch((error) => console.error(error)) // If any of these steps failed, print error
      .finally(() => {
        // If all steps succeeded, finish loading state
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    var content = <ActivityIndicator />;
    if (!isLoading) {
      content = (
        <FlatList
          data={data} // What array am I using?
          keyExtractor={({ id }, index) => id} // How are these values unique?
          renderItem={(
            { item } // What content do I want?
          ) => (
            <View style={styles.item}>
              <Text>
                {item.title}, {item.releaseYear}
              </Text>
            </View>
          )}
        />
      );
    }

    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "50%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
