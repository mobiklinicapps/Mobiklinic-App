import React, { useEffect, useState } from 'react';
import {
  View,
  Linking,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Loader from '../ui/loader';
import { COLORS } from '../constants/styles';
import CopyRight from '../simprints/copyright';

const Ambulance = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const response = await fetch('https://mk-be-strapi-production.up.railway.app/api/ambulances');
      const data = await response.json();
      setAmbulances(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching ambulances:', error);
      setIsLoading(false);
    }
  };

  const keyExtractor = item => item.id.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.attributes.contact}`)}>
      <ListItem bottomDivider>
        <Icon
          name="circle"
          size={25}
          color={'green'}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.listTitle}>{item.attributes.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            <View style={styles.wrapper}>
              <View style={styles.subtitle}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={{ color: COLORS.BLACK }}>{item.attributes.contact}</Text>
              </View>
              <View style={[styles.subtitle, { color: COLORS.BLACK }]}>
                <Text style={{ color: COLORS.BLACK }}>{item.attributes.hospital}</Text>
              </View>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="phone" size={25} color="rgba(0,0,0,.3)" />
      </ListItem>
    </TouchableOpacity>
  );

  if (isLoading) return <Loader />;
  if (!ambulances || ambulances.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.textColor}>No Ambulances available</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <View>
        <Text style={styles.header}>AMBULANCES</Text>
      </View>
      <FlatList
        data={ambulances}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <CopyRight />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    flexDirection: 'row',
    fontSize: 15,
    opacity: 0.5,
    color: COLORS.BLACK,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: COLORS.BLACK,
  },
  textColor: {
    color: COLORS.BLACK,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    textAlign: 'center',
    paddingVertical: 20,
    textDecorationLine: 'underline',
    backgroundColor: COLORS.WHITE,
  },
});

export default Ambulance;