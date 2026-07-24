// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   container: { flex: 1 },
// });





import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
  },
  illustrationWrap: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  walletIcon: {
    zIndex: 3,
  },
  coinLeft: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 2,
    transform: [{ rotate: '-15deg' }],
  },
  billIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 1,
    transform: [{ rotate: '20deg' }],
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPurple: { backgroundColor: '#B39DDB' },
  dotBlue: { backgroundColor: '#64B5F6' },
  dotYellow: { backgroundColor: '#FFD54F' },
  dotPink: { backgroundColor: '#F48FB1' },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#9B9BAA',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#F2994A',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});