import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import carouselImage1 from "../../assets/images/carosuel-1.jpg";
import { default as carouselImage2, default as carouselImage4 } from "../../assets/images/donationpagebanner-copy.jpg";
import carouselImage3 from "../../assets/images/poverty_2226036b.webp";
import Testimonial from "../../Component/Testimonial";
import { auth } from "../../Firebase/Config";

// DonationCard Component
const DonationCard = ({ imageSource, title, description, raised, goal }) => {
  const progress = (raised / goal) * 100;

  return (
    <View style={styles.donationCardContainer}>
      <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Raised {raised}$</Text>
          <Text style={styles.progressText}>Goal {goal}$</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <TouchableOpacity style={styles.cardDonateButton} activeOpacity={0.8}>
          <Text style={styles.cardDonateButtonText}>DONATE NOW →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// TestimonialCard Component

// TestimonialSection Component

const DonorScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in");
      } else {
        console.log("User is logged out");
        router.push("/");
      }
    });

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
      {/* Hero Section with Carousel */}
      <View style={styles.heroContainer}>
        <Swiper
          style={styles.swiper}
          showsButtons={false}
          autoplay={true}
          dotColor="#FF5F15"
          activeDotColor="#FFFFFF"
          loop={true}
        >
          <View style={styles.slide}>
            <Image
              source={carouselImage1}
              style={styles.slideImage}
              resizeMode="cover"
            />
            <View style={styles.slideOverlay}>
              <Text style={styles.slideTitle}>Make a Difference Today</Text>
              <Text style={styles.slideSubtitle}>
                Your donation can change lives
              </Text>
            </View>
          </View>
          <View style={styles.slide}>
            <Image
              source={carouselImage2}
              style={styles.slideImage}
              resizeMode="cover"
            />
            <View style={styles.slideOverlay}>
              <Text style={styles.slideTitle}>Impact Statistics</Text>
              <Text style={styles.slideSubtitle}>
                Over 10,000 lives impacted
              </Text>
            </View>
          </View>
          <View style={styles.slide}>
            <Image
              source={carouselImage3}
              style={styles.slideImage}
              resizeMode="cover"
            />
            <View style={styles.slideOverlay}>
              <Text style={styles.slideTitle}>Join Our Cause</Text>
              <Text style={styles.slideSubtitle}>
                Be part of something bigger
              </Text>
            </View>
          </View>
          <View style={styles.slide}>
            <Image
              source={carouselImage4}
              style={styles.slideImage}
              resizeMode="cover"
            />
            <View style={styles.slideOverlay}>
              <Text style={styles.slideTitle}>
                Together, We can make difference
              </Text>
              <Text style={styles.slideSubtitle}>Be a part of the change.</Text>
            </View>
          </View>
        </Swiper>
      </View>

      {/* Donation Card Section */}
      <View style={styles.section}>
        <DonationCard
          imageSource={require("../../assets/images/poverty_2226036b.webp")} // Replace with your image path
          title="Education Support"
          description="Providing access to quality education and learning resources for underprivileged children."
          raised={45.0}
          goal={120.0}
        />
      </View>

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
              <Ionicons
                name="heart"
                size={30}
                color="#FF5F15"
                style={{ marginBottom: 10 }}
              />
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

      {/* Testimonials Section */}
      <Testimonial />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
  },
  heroContainer: {
    height: 300,
  },
  swiper: {
    height: "100%",
  },
  slide: {
    flex: 1,
    position: "relative",
  },
  slideImage: {
    width: "100%",
    height: "100%",
  },
  slideOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  slideSubtitle: {
    fontSize: 18,
    color: "#e2f0ff",
    textAlign: "center",
  },
  section: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
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
    borderColor: "#FF9D80",
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
    borderColor: "#FF9D80",
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
    backgroundColor: "#FF5F15",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 25,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    borderColor: "#FF9D80",
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
  donationCardContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#28a745",
    borderRadius: 5,
  },
  cardDonateButton: {
    backgroundColor: "#FF5F15",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDonateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  testimonialSection: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
  },
  testimonialHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  hopeText: {
    color: "#FF6200",
  },
  testimonialSubheading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6200",
    textAlign: "center",
    marginBottom: 20,
  },
  testimonialsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  testimonialCard: {
    width: "30%",
    backgroundColor: "#FFF5EE",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  testimonialText: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 15,
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewerInfo: {
    flexDirection: "column",
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  reviewerTitle: {
    fontSize: 12,
    color: "#666666",
  },
});

export default DonorScreen;
