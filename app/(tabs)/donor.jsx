import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import Carousel from 'react-native-snap-carousel';

const DonorScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel data
  const carouselItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      title: "Education for All",
      description: "Help us build schools in rural areas",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      title: "Clean Water Initiative",
      description: "Provide clean drinking water to villages",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1576765974257-b414b9ea0051",
      title: "Medical Aid",
      description: "Support free medical camps in remote areas",
    },
  ];

  // Donation options
  const donationOptions = [
    { amount: 100, currency: "₹" },
    { amount: 500, currency: "₹" },
    { amount: 1000, currency: "₹" },
    { amount: 2000, currency: "₹" },
    { amount: 5000, currency: "₹" },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5F15" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={50} color="#FF5F15" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setError(null)}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome to the Donor Page</Text>
        <Text style={styles.cardContent}>
          This is a modern UI design for the donor page. You can add more
          content here.
        </Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Text style={styles.heroTitle}>Make a Difference Today</Text>
        <Text style={styles.heroSubtitle}>Your donation can change lives</Text>
      </View>

      {/* Causes Carousel */}
      {/* <View style={styles.carouselContainer}>
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 80}
          onSnapToItem={index => setActiveIndex(index)}
        />
      </View> */}

      {/* Donation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Donation Amount</Text>
        <View style={styles.donationOptions}>
          {donationOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.donationCard}
              activeOpacity={0.7}
            >
              <Text style={styles.currency}>{option.currency}</Text>
              <Text style={styles.amount}>{option.amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Donation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Or Enter Custom Amount</Text>
        <View style={styles.customDonation}>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.input}>500</Text>
          </View>
          <TouchableOpacity style={styles.donateButton} activeOpacity={0.8}>
            <Text style={styles.donateButtonText}>DONATE NOW</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Impact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12,540+</Text>
            <Text style={styles.statLabel}>Lives Changed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>78</Text>
            <Text style={styles.statLabel}>Projects Funded</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹3.2M+</Text>
            <Text style={styles.statLabel}>Donations Raised</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#FF5F15",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF5F15",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF5F15",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#FF5F15",
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
  },
  heroContainer: {
    backgroundColor: "#4361ee",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#e2f0ff",
    textAlign: "center",
  },
  section: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 20,
  },
  donationOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  donationCard: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#f0f7ff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d0e4ff",
  },
  currency: {
    fontSize: 18,
    color: "#3b82f6",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
  },
  customDonation: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f7ff",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginRight: 15,
    height: 60,
    borderWidth: 1,
    borderColor: "#d0e4ff",
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
    marginRight: 5,
  },
  input: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
  },
  donateButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  donateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#f0fdf4",
    width: "30%",
    borderWidth: 1,
    borderColor: "#dcfce7",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#047857",
  },
  statLabel: {
    fontSize: 14,
    color: "#65a30d",
    textAlign: "center",
    marginTop: 5,
  },
});

export default DonorScreen;
