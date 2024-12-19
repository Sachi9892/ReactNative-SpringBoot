import React, { useState } from "react";
import { View, Text, Alert, TextInput, Button, StyleSheet } from "react-native";

const UpdateStudent = ({ route, navigation }) => {
  const { student } = route.params;

  const [name, setName] = useState(student.name);
  const [rollNo, setRollNo] = useState(student.rollNo.toString());
  const [course, setCourse] = useState(student.course);

  const handleUpdate = () => {
    const updatedStudent = {
      ...student,
      name,
      rollNo: parseInt(rollNo),
      course,
    };

    //Base url keeps changes in react antive as there is no concept of localhost
    fetch("http://192.168.1.101:8080/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Success", "Record updated successfully!");
          //i think we are making some problem here , we should call fetchStudent()
          //or component from here .
          navigation.navigate("FetchStudents");
        } else {
          Alert.alert("Error", "Failed to update the record.");
        }
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        Alert.alert("Error", "An error occurred.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Student</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll No"
        value={rollNo}
        keyboardType="numeric"
        onChangeText={setRollNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default UpdateStudent;
