import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

type Props = ModalProps & {
  isOpen: boolean;
};

export const Modal = ({ isOpen, children }: Props) => {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "rgba(24, 24, 27, 0.8)",
  },
});
