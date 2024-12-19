import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Install react-native-vector-icons

const FetchStudents = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch("http://192.168.1.101:8080/students") // Replace with your IP address
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  };

  const deleteStudent = (rollNo) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            //Base url keeps changes in react antive as there is no concept of localhost
            fetch(`http://192.168.1.101:8080/delete?rollNo=${rollNo}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  Alert.alert("Success", "Record deleted successfully!");
                  fetchStudents(); // Refresh the list
                } else {
                  Alert.alert("Error", "Failed to delete the record.");
                }
              })
              .catch((error) => {
                console.error("Error deleting student:", error);
                Alert.alert("Error", "An error occurred.");
              });
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Roll no: {item.rollNo}</Text>
            <Text>Course: {item.course}</Text>
            <View style={styles.actionRow}>
              {/* Pencil icon for update */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UpdateStudent", { student: item })
                }
              >
                <Icon
                  name="pencil"
                  size={20}
                  color="blue"
                  style={styles.icon}
                />
              </TouchableOpacity>
              {/* Trash icon for delete */}
              <TouchableOpacity onPress={() => deleteStudent(item.rollNo)}>
                <Icon name="trash" size={20} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default FetchStudents;
