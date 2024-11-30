import { Modal as RNModal, ModalProps, KeyboardAvoidingView, View, StyleSheet }from "react-native"

type Props = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
}

export const Modal = ({isOpen, withInput, children, ...rest}: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView style={styles.container} behavior="padding" >
    {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>
      {children}
    </View>
  )
  
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {children}
    </RNModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "rgba(24, 24, 27, 0.4)"
  }
});

