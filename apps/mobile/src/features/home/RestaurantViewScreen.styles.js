import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselWrapper: {
    position: 'relative',
  },
  coverImage: {
    width,
    height: 280,
  },
  overlayButton: {
    position: 'absolute',
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    left: 20,
  },
  moreButton: {
    right: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  name: {
    color: '#111827',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  description: {
    color: '#9CA3AF',
    paddingHorizontal: 20,
    marginTop: 8,
    lineHeight: 20,
  },
  menuHeading: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  menuList: {
    paddingBottom: 32,
  },
  menuRow: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  filterWarning: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginTop: 8,
  },
});