import { StyleSheet } from 'react-native';

const COLORS = {
  white: '#FFFFFF',
  primary: '#F97316',      
  gray: '#6B7280',
  lightGray: '#D1D5DB',
  textMuted: '#6B7280',
  gray200: '#E5E7EB',
  black: '#1F2937',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 24,
  },

  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 32,
  },

  imagePlaceholder: {
    width: '100%',
    aspectRatio: 5 / 6,
    borderRadius: 20,
    backgroundColor: COLORS.transparent,
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: COLORS.primary,
    width: 10,
  },

  nextButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },

  nextText: {
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1,
  },

  skip: {
    textAlign: 'center',
    color: COLORS.gray,
  },
});


export default styles;