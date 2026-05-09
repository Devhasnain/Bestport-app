import { StyleSheet } from "react-native";
import colors from "@/config/Colors";


const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
  },
  headerBadgeRow: {
    flexDirection: 'row',
    gap: 5,
  },
  timeAgoBadge: {
    backgroundColor: colors.cardBadgeDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scrollContent: {
    gap: 12,
    paddingVertical: 10,
    paddingTop: 5,
    paddingHorizontal: 12,
  },
  jobInfoCard: {
    borderRadius: 12,
    padding: 18,
    backgroundColor: colors.white,
    flexDirection: 'column',
    gap: 10,
    borderWidth: 0.5,
    borderColor: colors.gray,
    elevation: 8,
  },
  assignedToRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  employeeProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 18,
    backgroundColor: colors.white,
    flexDirection: 'column',
    gap: 5,
    borderWidth: 0.5,
    borderColor: colors.gray,
    elevation: 15,
  },
  spaceBetweenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomActionContainer: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    elevation: 20,
  },
  ticketActionsContainer: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    flexDirection: 'column',
    gap: 10,
    elevation: 20,
  },
  btnPrimary: {
    backgroundColor: colors.btnPrimary,
    borderRadius: 12,
    minHeight: 50,
  },
  btnDisabled: {
    backgroundColor: colors.btnDisabled,
  },
  btnDisabledTitle: {
    color: colors.white,
  },
  btnReject: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    minHeight: 50,
    borderWidth: 1.5,
  },
  btnRejectTitle: {
    color: colors.btnPrimary,
  },
  btnRejectDisabled: {
    backgroundColor: 'transparent',
  },
  btnRejectDisabledTitle: {
    color: colors.primaryTextLight,
  },
});

export default styles