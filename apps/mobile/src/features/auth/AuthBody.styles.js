import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    overflow: 'hidden',
    zIndex: 1,
  },
  flex: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 32, flexGrow: 1 },}
);