import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const DonationCard = ({
  imageSource,
  title,
  description,
  raised,
  goal,
}) => {
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

export default DonationCard;

const styles = StyleSheet.create({
  donationCardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF5F15",
    borderRadius: 4,
  },
  cardDonateButton: {
    backgroundColor: "#FF5F15",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  cardDonateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
