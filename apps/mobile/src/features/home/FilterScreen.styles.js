import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: '85%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 10,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: '#FB923C',
    borderColor: '#FB923C',
  },
  chipText: {
    color: '#374151',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
  priceCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceCircleActive: {
    backgroundColor: '#FB923C',
    borderColor: '#FB923C',
  },
  priceText: {
    color: '#374151',
    fontWeight: '600',
  },
  priceTextActive: {
    color: '#fff',
  },
  starRow: {
    flexDirection: 'row',
    gap: 8,
  },
  starIcon: {
    marginRight: 2,
  },
  filterButton: {
    backgroundColor: '#FB923C',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});