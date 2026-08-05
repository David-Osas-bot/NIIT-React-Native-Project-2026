import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D64545',
    marginBottom: 12,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: '#8A8A8A',
  },
  trackButton: {
    backgroundColor: '#FF7A1A',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});