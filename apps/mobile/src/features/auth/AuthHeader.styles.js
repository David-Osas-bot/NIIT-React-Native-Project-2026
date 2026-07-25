import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#15152B',
    paddingHorizontal: 24,
    paddingBottom: 36,
    // borderBottomLeftRadius: 28,
    // borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  sunburst: {
    position: 'absolute',
    top: -5,
    left: -20,
    width: 160,
    height: 130,
    tintColor: '#FFFFFF',
  },
    broken: {
    position: 'absolute',
    top: -5,
    right: -7,
    width: 100,
    height: 340,
  },
  topRow: { marginBottom: 40 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginBottom: 28 },
});