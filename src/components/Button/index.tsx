import { PropsWithChildren } from 'react';
import { Pressable, PressableProps, Text, StyleSheet } from 'react-native';

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<PressableProps>) => {
  return (
    <Pressable style={styles.button} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
