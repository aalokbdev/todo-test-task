import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTodoStore } from "./store/todoStore";

export default function TodoListScreen() {
  const [input, setInput] = useState(""); // state to add todo data
  const [isEdit, setIsEdit] = useState(false);
  const [updateID, setUpdateID] = useState(0);
  const todos = useTodoStore((state: any) => state.todos); // used hook to get the data from store
  const { addTodo, updateTodo, deleteTodo } = useTodoStore(); // Destructure the methods to implement CRUD

  const handleAdd = () => {
    // User adds the todos in state to store
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  const handleEdit = (item: any) => {
    // User can get the value in text field to perform update
    setIsEdit(true);
    setInput(item.text);
    setUpdateID(item.id);
  };

  const handleUpdate = () => {
    // User can update the data
    updateTodo(updateID, input);
    setInput("");
    setIsEdit(false);
    setUpdateID(0)
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>TODO LIST</Text>

        {/* Todos list will display through Flatlist */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={{ width: "60%" }}>{item.text}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={styles.actionBtn}
                >
                  <Text style={{ color: "#FFF" }}>Update</Text>
                </TouchableOpacity>
                {updateID !== item.id && ( // Hide delete button if this item is being edited
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.actionBtn}
                  >
                    <Text style={{ color: "#FFF" }}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />

        {/* Text field display at bottom */}
        <View style={styles.bottomContainer}>
          {/* User can enter todos using input field */}
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            value={input}
            onChangeText={setInput}
          />

          {/* User can submit the text according to performed action */}
          {isEdit ? (
            <TouchableOpacity
              onPress={handleUpdate}
              style={styles.btnContainer}
            >
              <Text style={styles.btnText}>Update Task</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleAdd} style={styles.btnContainer}>
              <Text style={styles.btnText}>Add Task</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFd" },
  mainContainer: {
    flex: 1, paddingVertical: 30
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 10,
    width: "70%",
    fontSize: 20,
    height: 40,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 2,
    right: 2,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  btnContainer: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    width: "30%",
    flex: 1,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  actionBtn: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
});
