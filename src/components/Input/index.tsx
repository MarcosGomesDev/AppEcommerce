import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, InputContainer, InputText, TitleContainer } from './styles';
import { TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../styles/colors';

interface InputProps extends TextInputProps {
  placeholder?: string;
  secure?: boolean;
  secureEntry?: boolean;
  title?: string;
  showTitle?: boolean;
  errorMessage?: string;
}

export type InputHandler = { focusOnError: () => void; resetError: () => void };

export const Input = forwardRef<InputHandler, InputProps>(
  (
    {
      placeholder,
      secure,
      secureEntry,
      title,
      showTitle,
      errorMessage,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);

    const [changeSecureEntry, setChangeSecureEntry] = useState(secureEntry);

    useImperativeHandle(
      ref,
      () => ({
        focusOnError() {
          inputRef.current?.focus();
        },
        resetError() {},
      }),
      [inputRef],
    );

    return (
      <>
        {showTitle && (
          <TitleContainer>
            <Text
              color={Colors.primary}
              weight={700}
              align="left"
              size={16}
              style={{ paddingLeft: 12 }}
            >
              {title}
            </Text>
            {errorMessage && (
              <Text
                color={Colors.danger}
                weight={400}
                align="left"
                size={16}
                style={{ paddingLeft: 12, marginTop: 10 }}
              >
                {`${errorMessage} *`}
              </Text>
            )}
          </TitleContainer>
        )}
        <InputContainer>
          <InputText
            ref={inputRef}
            style={{
              borderColor: errorMessage ? Colors.danger : Colors.primary,
              paddingRight: secure ? 46 : 12,
            }}
            placeholder={placeholder}
            placeholderTextColor={'#a9a9a9'}
            autoCapitalize={'none'}
            secureTextEntry={changeSecureEntry}
            {...rest}
          />

          {secure && (
            <Button onPress={() => setChangeSecureEntry(!changeSecureEntry)}>
              <Icon
                name={changeSecureEntry ? 'visibility' : 'visibility-off'}
                size={24}
                color={Colors.primary}
              />
            </Button>
          )}
        </InputContainer>
      </>
    );
  },
);
