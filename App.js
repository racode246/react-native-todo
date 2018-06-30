/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import TodoList from './components/TodoList';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    
    this.loadTodos();
  }

  state = {
    newTodo: '',
    todos: [],
  }

  onChangeText(newTodo) {
    this.setState({ newTodo });
  }

  onPressAdd() {
    const { newTodo } = this.state;
    this.setState({
      newTodo: '',
      todos: [newTodo, ...this.state.todos],
    }, () => this.storeTodos()); // 第二引数に渡すことでsetStateの変更が完了したあとに呼ぶことができる
  }

  onPressDelete(index) {
    this.setState({
      todos: this.state.todos.filter((val, idx) => idx !== index),
    }, () => this.storeTodos());
  }

  storeTodos() {
    // AsyncStorageは保存時に文字列に変換する必要がある
    const str = JSON.stringify(this.state.todos);
    AsyncStorage.setItem('todos', str);
  }

  loadTodos() {
    AsyncStorage.getItem('todos').then(str => {
      const todos = str ? JSON.parse(str) : [];
      this.setState({ todos });
    });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TextInput 
          value={this.state.newTodo}
          style={styles.form}
          onChangeText={text => this.onChangeText(text)}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => this.onPressAdd()}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
        <TodoList 
          todos={this.state.todos} 
          onPressDelete={(index) => this.onPressDelete(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  form: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#333333',
    padding: 14,
    marginTop: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
