import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WaveformAnimation } from '../../components/WaveformAnimation';

export default function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleRecordPress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate transcription
      setTranscription('');
      const demoText = 'Meeting scheduled for next Tuesday at 2 PM.\nAction items:\n- Review Q4 reports\n- Prepare presentation slides\n- Contact marketing team';
      let currentText = '';
      const words = demoText.split(' ');
      
      words.forEach((word, index) => {
        setTimeout(() => {
          currentText += word + ' ';
          setTranscription(currentText);
        }, index * 500);
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>EchoTalk</Text>
      </View>

      <View style={styles.waveformContainer}>
        <WaveformAnimation isRecording={isRecording} />
      </View>

      <ScrollView
        style={styles.transcriptionContainer}
        contentContainerStyle={styles.transcriptionContent}>
        <Text style={[styles.transcriptionText, isDark && styles.textLight]}>
          {transcription || 'Press and hold the microphone button to start recording...'}
        </Text>
      </ScrollView>

      <View style={styles.controlsContainer}>
        <Pressable
          onPress={handleRecordPress}
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
          ]}>
          <Ionicons
            name={isRecording ? 'stop' : 'mic'}
            size={32}
            color="white"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  containerDark: {
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  textLight: {
    color: '#FFFFFF',
  },
  waveformContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptionContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  transcriptionContent: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    minHeight: 200,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1A1A',
  },
  controlsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordButtonActive: {
    backgroundColor: '#FF3B30',
  },
});