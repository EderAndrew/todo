import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import ListContainer from './src/components/ListContainer'

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Header = styled.View`
  justify-content: center;
  align-items: center;
  height:80px;
`
const Title = styled.Text`
  font-size: 20px;
`;
const ListTodo = styled.FlatList`
  
`;

const Footer = styled.View`
 width: 100%;
 height: 180px;
 justify-content: center;
 align-items:center;
`;

const AreaInput = styled.TextInput`
  border: 1px solid #ddd;
  height: 50px;
  width: 90%;
  border-radius: 5px;
  color: #ccc;
  padding: 10px;

`;
const ButtonInput = styled.TouchableHighlight`
  width: 80%;
  height: 50px;
  margin: 20px;
  background-color: #90E89F;
  border: 1px solid #90E8D1;
  border-radius:10px;
  justify-content:center;
  align-items: center;
`;
const TitleButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const Todo = () => {
  const [dados, setDados] = useState([]);
  const [input, setInput] = useState('');
  let texto = '';

  let url = 'https://b7web.com.br/todo/73938';

  //Listar items
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(json => {
        let t = json.todo;
        setDados(t)
    })
  },[dados])
  
  
 
  //Adicionar Item
  const addItem = () => {
    fetch(url, {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        item:texto
      })
    })
      .then(r => r.json())
      .then(jsont => {
        alert('Item inserido com sucesso')
      })
  }

  const addButton = () => {
    texto = input;
    let setup = '';
    setInput(setup);
    addItem()
  }
  return(
    <Container>
      <Header>
        <Title>ToDo List</Title>
      </Header>
      <ListTodo 
        data={dados}
        renderItem={({item}) => <ListContainer data={item} url={url} />}
        keyExtractor={({item, index}) => item.id}
      />

      <Footer>
        <AreaInput placeholder="Adicione uma nova tarefa" onChangeText={text => setInput(text)} value={input}/>
        <ButtonInput underlayColor="#ABFFD1" onPress={addButton}>
          <TitleButton>Inserir</TitleButton>
        </ButtonInput>
      </Footer>
    </Container>
  );
}

export default Todo;

