import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  primary: '#FE724C',
  white: '#FFFFFF',
  textDark: '#1A1E26',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  borderLine: '#F2F2F2',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 12,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  contactOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.bgLight,
    borderRadius: 16,
    paddingVertical: 16,
    marginRight: 10,
  },
  contactIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  faqCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLine,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  faqItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 19,
    marginTop: 10,
  },
  reportButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 15,
  },
  reportButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});