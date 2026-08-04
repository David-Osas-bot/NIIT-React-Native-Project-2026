import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFC',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 170,
  },

  welcome: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FF7622',
  },

  title: {
    marginTop: 4,
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 28,
  },

  card: {
    height: 145,
    backgroundColor: '#FDF3E9',
    borderRadius: 24,
    marginBottom: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 3,
  },

  textContainer: {
    flex: 1,
    paddingRight: 90,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  cardSubtitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },

  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 120,
    height: 130,
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 185,
  },
});