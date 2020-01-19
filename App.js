import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

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

const VerifyNet = styled.View`
  align-items:flex-start;
  width:100%;
  padding-left:20px;
`;
const Text = styled.Text`
  color: #ddd;
  font-size:12px;
`;

const Todo = () => {
  const [dados, setDados] = useState([]);
  const [input, setInput] = useState('');
  const [netStatus, setNetStatus] = useState(0);

  let texto = '';

  const url = 'https://b7web.com.br/todo/73938';

  //Listar items direto da internet
  useEffect(() => {
    //Agora verifica se esta conectado. Se estiver conectado, fluxo normal
    switch(netStatus){
      case 1:
        fetch(url)
          .then(r => r.json())
          .then(json => {
          let t = json.todo;
          setDados(t)
          //Armazena no AsyncStorage
          let lista = JSON.stringify(json.todo)//pegando o json em forma de string
          AsyncStorage.setItem(dados, lista)//Armazenando a string denttro do state
        })
        break;
      //Se não estiver conectado, puxa do AsyncStorage
      case 0:
        AsyncStorage.getItem(dados).then(v => {
          if(v != ''){
            let listaJSON = JSON.parse(v)
            dados = listaJSON
          }
          
          setDados(dados)
          
        })
        break;
    }
    
  },[])
  
  //Utilizando o useEffect para que, assim que abrir o aplicativo, 
  //o NetInfo ja identifique se o aplicativo esta online ou offline
  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setNetStatus(0)
      } else{
        setNetStatus(1)
      }
    });
  }, [])
 
  //Adicionar Item
  const addItem = () => {
    switch(netStatus){
      case 1:
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
        break;
      case 0:
        alert('Não foi possível adicionar. Não temos conexão!');
        break;

    }
    
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
        <VerifyNet>
          <Text>{netStatus?'on-line':'off-line'}</Text>
        </VerifyNet>
      </Footer>
    </Container>
  );
}

console.disableYellowBox = true;
export default Todo;

