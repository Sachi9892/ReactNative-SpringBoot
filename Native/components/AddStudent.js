import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const AddStudent = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");

  const handleAddStudent = () => {
    //Base url keeps changes in react antive as there is no concept of localhost
    const backendUrl = "http://192.168.1.101:8080/add";

    const studentData = {
      id: parseInt(id),
      name,
      rollNo: parseInt(rollNo),
      course,
    };

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.text()) // Get server response as text
      .then((message) => {
        console.log("Server response:", message);
        setId(""),
          setName(""),
          setCourse(""),
          setRollNo(""),
          alert("Student added successfully!");
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        alert("Failed to add student");
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Id : "
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Name : "
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Roll No : "
        value={rollNo}
        onChangeText={setRollNo}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
};

export default AddStudent;
