import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Donor",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "Being part of this community has been incredibly rewarding. Every donation makes a real difference in someone's life.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Monthly Supporter",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "The transparency and impact of this platform is remarkable. I can see exactly how my contributions are helping others.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Community Member",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "The stories of change and transformation I've witnessed through this platform are truly inspiring.",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Our Donors Say</Text>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        dotColor="#FF5F15"
        activeDotColor="#FFFFFF"
        loop={true}
      >
        {testimonials.map((testimonial) => (
          <View key={testimonial.id} style={styles.slide}>
            <View style={styles.testimonialCard}>
              <Image
                source={{ uri: testimonial.image }}
                style={styles.profileImage}
              />
              <Text style={styles.testimonialText}>{testimonial.text}</Text>
              <View style={styles.ratingContainer}>
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Text key={index} style={styles.star}>
                    ★
                  </Text>
                ))}
              </View>
              <Text style={styles.name}>{testimonial.name}</Text>
              <Text style={styles.role}>{testimonial.role}</Text>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: "#f8f9fa",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 20,
  },
  wrapper: {
    height: 340,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  testimonialCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width - 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#FF5F15",
  },
  testimonialText: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 15,
    fontStyle: "italic",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    color: "#FF5F15",
    fontSize: 20,
    marginHorizontal: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: "#718096",
  },
});

export default Testimonial;

const TestimonialCard = ({ rating, text, image, name, title }) => {
  return (
    <View style={styles.testimonialCard}>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons key={index} name="star" size={20} color="#FFD700" />
        ))}
      </View>
      <Text style={styles.testimonialText}>{text}</Text>
      <View style={styles.reviewerContainer}>
        <Image source={image} style={styles.reviewerImage} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{name}</Text>
          <Text style={styles.reviewerTitle}>{title}</Text>
        </View>
      </View>
    </View>
  );
};
