import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  sparkleWrapper: {
    width: 220,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  sparkle: {
    position: 'absolute',
    color: '#FDBA9A',
  },
  sparkleTiny: {
    fontSize: 10,
  },
  sparkleSmall: {
    fontSize: 14,
  },
  sparkleMedium: {
    fontSize: 18,
  },
  sparkleLarge: {
    fontSize: 22,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#F97316',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});