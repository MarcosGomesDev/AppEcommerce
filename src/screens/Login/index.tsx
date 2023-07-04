import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Utils from '../../utils';

import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { Input, InputHandler } from '../../components/Input';
import Text from '../../components/Text';

import {
  ButtonOut,
  TitleContainer,
  Main,
  Form,
  Header,
  Image,
  Links,
  ButtonOutline,
} from './styles';

import * as zod from 'zod';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showToast } from '../../store/modules/toast/actions';
import { Colors } from '../../styles/colors';
import Logo from '../../assets/logo.png';

const loginFormSchema = zod.object({
  login: zod
    .string()
    .nonempty('O login não pode ser vazio!')
    .min(1, 'Forneça o e-mail ou CPF/CNPJ'),
  password: zod
    .string()
    .nonempty('A senha não pode ser vazia')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

type LoginFormData = zod.infer<typeof loginFormSchema>;

export function Login() {
  const dispatch = useDispatch();

  const emailInput = useRef<InputHandler>(null);
  const passInput = useRef<InputHandler>(null);

  const [isSeller, setISeller] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    let timeoutId: any;

    function showErrorMessage(error: any) {
      if (error.login && error.password) {
        emailInput.current?.focusOnError();
      } else if (error.login) {
        emailInput.current?.focusOnError();
      } else if (error.password) {
        passInput.current?.focusOnError();
      }
    }

    if (errors) {
      timeoutId = setTimeout(() => {
        clearErrors();
      }, 9000);
    }

    if (errors.login || errors.password) {
      showErrorMessage(errors);
    }

    emailInput.current?.resetError();
    passInput.current?.resetError();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errors, clearErrors, emailInput, passInput]);

  async function handleSubmitSignInForm({ login, password }: LoginFormData) {
    if (Utils.isValidCPF(login) || Utils.isValidCnpj(login)) {
      login = login.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '');
    }

    if (!Utils.isCpfOrCnpjOrEmailValid(login)) {
      dispatch(showToast('E-mail ou Cpf/Cnpj inválido', 'error', 'error'));
      setError('login', { message: 'Campo Inválido' });
      return;
    }

    if (isSeller) {
      reset({
        login: '',
        password: '',
      });
    } else {
      reset({
        login: '',
        password: '',
      });
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Main>
          <Header>
            <Image source={Logo} />
          </Header>
          <TitleContainer>
            <Text weight={700} color={Colors.primary} size={22}>
              Bem vindo de volta!
            </Text>
          </TitleContainer>

          <Form>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState }) => (
                <Input
                  ref={emailInput}
                  showTitle
                  errorMessage={fieldState.error?.message}
                  title="E-mail ou CPF/CNPJ"
                  placeholder="E-mail ou CPF/CNPJ (somente números)"
                  onBlur={onBlur}
                  value={value}
                  maxLength={/^\d{2}/.test(value) ? 18 : undefined}
                  onChangeText={(e: string) => {
                    const regex = /^\d{2}/;
                    if (regex.test(e)) {
                      onChange(Utils.maskCpfOrCnpj(e));
                      return;
                    }

                    onChange(e);
                  }}
                />
              )}
              name="login"
              defaultValue=""
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState }) => (
                <Input
                  ref={passInput}
                  showTitle
                  errorMessage={fieldState.error?.message}
                  secure
                  secureEntry
                  title="Senha"
                  placeholder="Insira sua senha"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(e: string) => {
                    onChange(e);
                  }}
                />
              )}
              name="password"
              defaultValue=""
              rules={{ required: true }}
            />

            <Links>
              <ButtonOutline style={{ alignSelf: 'center' }} onPress={() => {}}>
                <Text size={14} color={Colors.primary}>
                  Esqueceu a senha?
                </Text>
              </ButtonOutline>
            </Links>

            <Button onPress={handleSubmit(handleSubmitSignInForm)}>
              <Text size={18} weight={700} color="#fff">
                Entrar
              </Text>
            </Button>
          </Form>
          <ButtonOut
            style={{ alignSelf: 'center' }}
            onPress={() => setISeller(!isSeller)}
          >
            <Text size={14} color={Colors.primary}>
              {isSeller ? 'Entrar como usuário' : 'Entrar como vendedor'}
            </Text>
          </ButtonOut>
        </Main>
      </TouchableWithoutFeedback>
    </Container>
  );
}
