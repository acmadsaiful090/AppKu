import { Dimensions } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const themedStyles = StyleService.create({
  // Bagian universal - dapat digunakan di semua screen
  container: {
    flex: 1,
    backgroundColor: 'background-color',
  },
  sectionTitle: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    marginVertical: screenHeight * 0.01,
    color: 'text-basic-color',
  },
  titleText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: 'text-basic-color',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.125,
    backgroundColor: '$background-basic-color-3',
  },
  circle: {
    width: screenWidth * 0.225,
    height: screenWidth * 0.225,
    borderRadius: screenWidth * 0.1125,
    backgroundColor: '$background-basic-color-1',
  },
  scrollViewContent: {
    paddingHorizontal: screenWidth * 0.04,
    paddingBottom: screenHeight * 0.02,
  },
  profileName: {
    fontSize: screenWidth * 0.055,
    fontWeight: 'bold',
    color: '$text-basic-color',
  },
  profileRole: {
    fontSize: screenWidth * 0.04,
    color: '$text-basic-color',
  },
  
  // Style untuk screen profile
  profile: {
    marginTop: screenWidth * 0.01,
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: screenWidth * 0.225,
  },

  // Style untuk screen birthday
  birthdayItem: {
    flexDirection: 'row',
    padding: screenWidth * 0.02,
    marginRight: screenWidth * 0.025,
    borderRadius: screenWidth * 0.025,
    alignItems: 'center',
    width: screenWidth * 0.6,
    height: screenWidth * 0.2,
  },
  birthdayName: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'text-basic-color',
  },
  birthdayDate: {
    fontSize: screenWidth * 0.035,
    color: 'text-basic-color',
  },
  birthdayDifference: {
    fontSize: screenWidth * 0.035,
    color: 'text-basic-color',
  },
  birthdayRole: {
    fontSize: screenWidth * 0.03,
    color: 'text-basic-color',
  },

  // Style untuk screen attendance
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceNumber: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    color: 'text-placeholder-color',
  },
  attendanceLabel: {
    fontSize: screenWidth * 0.04,
    color: 'text-primary-color',
  },
  
  // Style untuk screen no birthday
  noBirthdayCard: {
    backgroundColor: 'background-card-color',
    borderRadius: screenWidth * 0.04,
    padding: screenWidth * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  noBirthdayText: {
    fontSize: screenWidth * 0.04,
    color: 'text-basic-color',
    textAlign: 'center',
  },
  
  // Style untuk screen info
  infoItem: {
    padding: screenWidth * 0.02,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    backgroundColor: '$background-basic-color-1',
    alignItems: 'center',
    marginBottom: screenWidth * 0.025,
  },
  infoTitle: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '$text-basic-color',
  },
  infoDescription: {
    fontSize: screenWidth * 0.035,
    color: '$text-placeholder-color',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
