import React, { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter, Text, Button, Alert, Modal, StyleSheet, useColorScheme, NativeModules, View } from 'react-native';

const { IdentificationModule } = NativeModules;
const { IdentificationPlus } = NativeModules;

function SimprintsConnect({}) {
  const [identificationPlusResults, setIdentificationPlusResults] = useState([]);
  const [enrollmentGuid, setEnrollmentGuid] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    const identificationResultPlusSubscription = DeviceEventEmitter.addListener('onIdentificationResult', results => {
      setIdentificationPlusResults(results);
      setShowButtons(false); // Hide buttons after getting identification results
    });

    return () => {
      identificationResultPlusSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const registrationSuccessSubscription = DeviceEventEmitter.addListener('SimprintsRegistrationSuccess', event => {
      const { guid } = event;
      setEnrollmentGuid(guid);
    });

    return () => {
      registrationSuccessSubscription.remove();
    };
  }, []);

  const handleIdentificationPlus = () => {
    const projectID = 'WuDDHuqhcQ36P2U9rM7Y';
    const moduleID = 'test_user';
    const userID = 'mpower';

    setShowButtons(false); // Hide buttons when identification starts
    IdentificationPlus.registerOrIdentify(projectID, moduleID, userID);
  };

  const goBack = () => {
    setShowButtons(true);
    setIdentificationPlusResults([]);
    setEnrollmentGuid(null);
  };

  return (
    <View style={styles.container}>
      <View>
        {showButtons && (
          <>
            <View style={{ height: 20 }} />
            <Button title="Start Biometric Search" onPress={handleIdentificationPlus} />
            <View style={{ height: 20 }} />
          </>
        )}
        <View style={{ height: 20 }} />

        {enrollmentGuid && (
          <>
            <Text style={styles.text}>Beneficiary Enrolled on ID:</Text>
            <Text>{enrollmentGuid}</Text>
            <View style={{ height: 20 }} />
          </>
        )}

        {identificationPlusResults.length > 0 && (
          <>
            <Text style={styles.text}>Beneficiary Identified :</Text>
            <View style={{ height: 20 }} />
          </>
        )}

        {identificationPlusResults.map((result, index) => (
          <View key={result.id + index}>
            <Text>
              <View style={{ height: 20 }} />
              Tier: {result.tier}, Confidence: {result.confidenceScore}, Guid: {result.guid}
            </Text>
          </View>
        ))}
        <View style={{ height: 20 }} />
        {!showButtons && <Button title="Go Back" onPress={goBack} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default SimprintsConnect;
