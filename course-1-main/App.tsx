import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

type Course = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
};

const COURSES: Course[] = [
  {
    id: '1',
    name: 'Six-Month Gardening Learnership',
    description: 'Comprehensive gardening techniques, plant care, and landscaping over 12 weeks.',
    price: 'R5,000.00',
    duration: '6 Months',
    image: 'https://example.com/gardening_learnership.jpg',
  },
  {
    id: '2',
    name: 'Six-Week Short Domestic Skills Training',
    description: 'Focused training on home management, cleaning, and maintenance.',
    price: 'R2,500.00',
    duration: '6 Weeks',
    image: 'https://example.com/domestic_skills.jpg',
  },
  {
    id: '3',
    name: 'Six-Month Cooking Learnership',
    description: 'Professional cooking skills, recipe development, and kitchen safety.',
    price: 'R6,000.00',
    duration: '6 Months',
    image: 'https://example.com/cooking_learnership.jpg',
  },
  {
    id: '4',
    name: 'Six-Week Advanced Gardening Skills',
    description: 'Short, advanced gardening techniques for seasoned gardeners.',
    price: 'R3,000.00',
    duration: '6 Weeks',
    image: 'https://example.com/advanced_gardening.jpg',
  },
];

type ItemProps = {
  course: Course;
  onPress: () => void;
};

const CourseItem: React.FC<ItemProps> = ({ course, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <Image source={{ uri: course.image }} style={styles.itemImage} />
    <Text style={styles.itemName}>{course.name}</Text>
    <Text>{course.duration}</Text>
    <Text style={styles.itemPrice}>{course.price}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseStarted, setIsCourseStarted] = useState(false);

  const openModal = (course: Course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCourse(null);
    setIsCourseStarted(false);
  };

  const handleStartCourse = () => {
    setIsCourseStarted(true);
    Alert.alert('Course Started', `You have started the course: ${selectedCourse?.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Empowering the Nation</Text>
      <Text style={styles.subtitle}>Transforming Lives Through Skills Training</Text>

      <FlatList
        data={COURSES}
        renderItem={({ item }) => (
          <CourseItem course={item} onPress={() => openModal(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Creates a grid with two columns
        columnWrapperStyle={styles.columnWrapper} // Adds space between items in grid
      />

      <Modal animationType="slide" transparent={false} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {selectedCourse ? (
            <>
              <Image source={{ uri: selectedCourse.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedCourse.name}</Text>
              <Text style={styles.modalDuration}>Duration: {selectedCourse.duration}</Text>
              <Text style={styles.modalPrice}>{selectedCourse.price}</Text>
              <Text style={styles.modalDescription}>{selectedCourse.description}</Text>

              <View style={styles.buttonContainer}>
                <Button title="Start" onPress={handleStartCourse} disabled={isCourseStarted} />
                <Button title="Back to Courses" onPress={closeModal} />
              </View>

              {isCourseStarted && (
                <Text style={styles.courseStartedText}>Course is now in progress...</Text>
              )}
            </>
          ) : (
            <Text style={styles.modalTitle}>No course selected</Text>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#ff3300',
    marginTop: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Space between columns
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDuration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  courseStartedText: {
    fontSize: 16,
    color: '#28a745',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
