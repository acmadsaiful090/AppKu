import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, Pressable, Dimensions, ActivityIndicator, AppState } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet, Icon, Button } from '@ui-kitten/components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import leaveTypes from '../../assets/data/leaveTypes';
import LeaveTypeList from '../Components/Leave/LeaveTypeList';
import LeaveHistoryItem from '../Components/Leave/LeaveHistoryItem';
import DetailsHistoryModal from '../Components/Schedule/DetailsHistoryModal';
const { width, height } = Dimensions.get('window');
const ITEMS_PER_PAGE = 4;
const LeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // Fetch leave history
  const fetchLeaveHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://66bad3266a4ab5edd6364e75.mockapi.io/leaveHistory');
      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.applied) - new Date(a.applied));
      setHistoryData(sortedData);
    } catch (error) {
      console.error('Error fetching leave history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reload data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchLeaveHistory();
    }, [])
  );

  // Re-fetch data when the app returns from the background
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        fetchLeaveHistory();
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);
  // Navigation handlers
  const handleCardPress = useCallback((leave) => {
    navigation.navigate('LeaveDetail', { leaveType: leave.type });
  }, [navigation]);
  const handleHistoryItemPress = useCallback((id) => {
    setSelectedId(id);
    setModalVisible(true);
  }, []);
  // Pagination
  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE);
  const paginatedHistory = historyData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const renderArrowLeftIcon = (style) => (
      <Icon {...style} name="arrow-left-outline"  />
    );
  
    const renderArrowRightIcon = (style) => (
      <Icon {...style} name="arrow-right-outline" />
    );

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text category="h5" style={styles.title}>Leave Type</Text>
        <LeaveTypeList leaveTypes={leaveTypes} onCardPress={handleCardPress} />
        
        <Text category="h5" style={styles.title}>Leave History</Text>
        {loading ? (
          <ActivityIndicator size="large" color={styles.indicatorColor.color} />
        ) : (
          paginatedHistory.map(item => (
            <LeaveHistoryItem 
              key={item.id} 
              item={item} 
              onPress={() => handleHistoryItemPress(item.id)} 
            />
          ))
        )}

        {!loading && totalPages > 1 && (
        <View style={styles.pagination}>
        <Button
          appearance="ghost"
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          accessoryLeft={renderArrowLeftIcon}
        />
        <Text>{`${currentPage} / ${totalPages}`}</Text>
        <Button
          appearance="ghost"
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          accessoryLeft={renderArrowRightIcon}
        />
      </View>
        )}
      </ScrollView>

      <Pressable style={styles.button} onPress={() => navigation.navigate('ApplyLeave')}>
        <Icon name="plus-circle-outline" fill="#FFFFFF" style={styles.icon} />
      </Pressable>

      <DetailsHistoryModal
        visible={modalVisible}
        selectedId={selectedId}
        onClose={() => setModalVisible(false)}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-color',
    paddingHorizontal: width * 0.04,
  },
  button: {
    position: 'absolute',
    bottom: height * 0.02,
    right: width * 0.04,
    width: width * 0.13,
    height: height * 0.06,
    borderRadius: width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'navbar-button-color',
  },
  icon: {
    width: width * 0.08,
    height: height * 0.04,
  },
  title: {
    fontWeight: 'bold',
    color: 'text-basic-color',
    marginBottom: height * 0.02,
  },
  scrollContainer: {
    paddingBottom: height * 0.1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicatorColor: {
    color: 'color-primary-500',
  },
});
export default LeaveScreen;