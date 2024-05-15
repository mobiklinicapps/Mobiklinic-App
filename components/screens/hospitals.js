import React, { useEffect, useState } from 'react';
import {
  View,
  Linking,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Loader from '../ui/loader';
import { COLORS } from '../constants/styles';
import CopyRight from '../simprints/copyright';

const Hospital = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch('https://mk-be-strapi-production.up.railway.app/api/facilities');
      const data = await response.json();
      setHospitals(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
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
                <Text style={{ color: COLORS.BLACK }}>{item.attributes.address}</Text>
              </View>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="phone" size={25} color="rgba(0,0,0,.3)" />
      </ListItem>
    </TouchableOpacity>
  );

  if (isLoading) return <Loader />;
  if (!hospitals || hospitals.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.textColor}>No Hospitals available</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <View>
        <Text style={styles.header}>HOSPITALS NEAR ME</Text>
      </View>
      <FlatList
        data={hospitals}
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

export default Hospital;