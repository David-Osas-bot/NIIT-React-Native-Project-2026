import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greeting: {
    color: '#111827',
    fontSize: 24,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  greetingBold: {
    fontWeight: 'bold',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#F97316',
    fontWeight: '500',
  },
});