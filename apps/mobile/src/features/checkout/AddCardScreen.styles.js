import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F3F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  illustrationArea: {
    height: 120,
    backgroundColor: '#F7F7FA',
    marginHorizontal: 0,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9B9BAA',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F3F5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1A1A2E',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfField: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#F2994A',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});