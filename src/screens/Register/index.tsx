import { Text } from 'react-native';
import React from 'react';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';

export function Register() {
  return (
    <Container>
      <Text>Ops!</Text>
      <Text>Você tentou acessar uma página que se perdeu pelo caminho.</Text>
      <Text>
        A página que você tentou acessar não existe mais, mas você pode começar
        um novo caminho voltando para a página inicial :)
      </Text>
      <Button onPress={() => {}}>
        <Text>Voltar para a página inicial</Text>
      </Button>
    </Container>
  );
}
