import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  UserStatus,
  UserObjective,
  AccommodationType,
  formatCurrency,
  calculateAverageRating,
  type UserResponseDto,
  type AccommodationResponseDto,
} from '@exchange-core/shared';

const UserProfile = () => {
  // Exemplo de uso dos types compartilhados no mobile
  const user: UserResponseDto = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    status: UserStatus.STUDENT,
    objective: UserObjective.BOTH,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const accommodation: AccommodationResponseDto = {
    id: '1',
    active: true,
    type: AccommodationType.HOMESTAY,
    title: 'Cozy Homestay in Toronto',
    city: 'Toronto',
    priceCad: 800,
    currency: 'CAD',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const averageRating = calculateAverageRating(4, 5, 4);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Status: {user.status}</Text>
      <Text>Objective: {user.objective}</Text>

      <View style={styles.separator} />

      <Text style={styles.title}>Sample Accommodation</Text>
      <Text>Title: {accommodation.title}</Text>
      <Text>City: {accommodation.city}</Text>
      <Text>Price: {formatCurrency(accommodation.priceCad)}</Text>
      <Text>Type: {accommodation.type}</Text>
      <Text>Rating: {averageRating} ⭐</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
});

export default UserProfile;
