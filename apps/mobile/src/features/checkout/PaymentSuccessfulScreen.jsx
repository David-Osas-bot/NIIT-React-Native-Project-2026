// import { View } from 'react-native';
// import styles from './PaymentSuccessfulScreen.styles';
 
// export default function PaymentSuccessfulScreen() {
//   return <View style={styles.container} />;
// }






import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './PaymentSuccessfulScreen.styles';

export default function PaymentSuccessfulScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationWrap}>
          {/* Decorative confetti dots */}
          <View style={[styles.dot, styles.dotPurple, { top: 10, left: 20 }]} />
          <View style={[styles.dot, styles.dotBlue, { top: 30, right: 10 }]} />
          <View style={[styles.dot, styles.dotYellow, { top: 60, left: 0 }]} />
          <View style={[styles.dot, styles.dotPink, { bottom: 20, right: 30 }]} />
          <View style={[styles.dot, styles.dotPurple, { bottom: 0, left: 40 }]} />

          {/* Wallet + coins illustration */}
          <FontAwesome5 name="coins" size={36} color="#F5B942" style={styles.coinLeft} />
          <FontAwesome5 name="money-bill-wave" size={40} color="#F2994A" style={styles.billIcon} />
          <FontAwesome5 name="wallet" size={90} color="#F2994A" style={styles.walletIcon} />
        </View>

        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>
          You successfully maked a payment,{'\n'}enjoy our service!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tracking')}
      >
        <Text style={styles.buttonText}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
  );
}