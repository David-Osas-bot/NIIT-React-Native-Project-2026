import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './WithdrawSuccessScreen.styles';

export default function WithdrawSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.sparkleWrapper}>
        <Text style={[styles.sparkle, styles.sparkleLarge, { top: 0, left: 30 }]}>✦</Text>
        <Text style={[styles.sparkle, styles.sparkleSmall, { top: 20, right: 40 }]}>✦</Text>
        <Text style={[styles.sparkle, styles.sparkleSmall, { top: 50, left: 10 }]}>✦</Text>
        <Text style={[styles.sparkle, styles.sparkleMedium, { top: 60, right: 10 }]}>✦</Text>
        <Text style={[styles.sparkle, styles.sparkleTiny, { top: 55, left: 55 }]}>✦</Text>
        <Text style={[styles.sparkle, styles.sparkleTiny, { top: 5, left: 90 }]}>✦</Text>
        <Text style={[styles.sparkle, styles.sparkleLarge, { top: 75, right: 55 }]}>✦</Text>

        <View style={styles.iconCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      </View>

      <Text style={styles.title}>Withdraw Successful</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation?.goBack()}
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}