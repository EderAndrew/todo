import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

import ListContainer from './src/components/ListContainer'

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  height:80px;
`
const Title = styled.Text`
  font-size: 20px;
  margin-left:20px;
  margin-top: 20px;
`;
const ButtonSync = styled.TouchableHighlight`
  width:28px;
  height:28px;
  margin-right: 20px;
  margin-top: 20px;
  justify-content: center;
  align-items:center;
`;
const ImageSync = styled.Image`
  
`;
const ListTodo = styled.FlatList``;

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
  const loadList = () => {
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
            AsyncStorage.setItem('dados', lista)//Armazenando a string denttro do state
          })
          break;
        //Se não estiver conectado, puxa do AsyncStorage
        case 0:
          AsyncStorage.getItem('dados').then(v => {
            let s = []
            if(v != ''){
              let listaJSON = JSON.parse(v)
              s = listaJSON
            }
            
            setDados(s)
            
          })
          break;
      }
      
  }
  
  
  //Utilizando o useEffect para que, assim que abrir o aplicativo, 
  //o NetInfo ja identifique se o aplicativo esta online ou offline
  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setNetStatus(0)
      } else{
        setNetStatus(1)
      }

      if(dados.length == 0){
        loadList()
      }
    });
  }, [])
 
  //Adicionar Item
  // const addItem = () => {
  //   switch(netStatus){
  //     case 1:
  //       fetch(url, {
  //         method:'POST',
  //         headers:{
  //           'Accept':'application/json',
  //           'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({
  //           item:texto
  //         })
  //       })
  //         .then(r => r.json())
  //         .then(jsont => {
  //           alert('Item inserido com sucesso')
  //         })
  //       break;
  //     case 0:
  //       alert('Não foi possível adicionar. Não temos conexão!');
  //       break;

  //   }
    
  // }

  const addButton = () => {  
    AsyncStorage.getItem('dados').then(v => {
      let s = []
      let listaJSON = JSON.parse(v)
      listaJSON.push({
        item: input,
        done:'0',
        id:0
      })
     
      s = listaJSON

      let listaStr = JSON.stringify(listaJSON)
      AsyncStorage.setItem('dados', listaStr)

      setInput('');
      setDados(s)
    })

    //addItem()
  }

  const sincronizar = () => {
    AsyncStorage.getItem('dados').then(v => {
      fetch(`${url}/sync`, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          json:v
        })
      })
        .then(r => r.json())
        .then(json => {
          if (json.todo.status){
            alert('Itens sincronizados com sucesso')
          }else{
            alert('Tente mais tarde')
          }
          
        })
    })
  }

  return(
    <Container>
      <Header>
        <Title>ToDo List</Title>
        <ButtonSync underlayColor='transparent' onPress={sincronizar}>
          <ImageSync source={require('./src/img/sync_press.png')} />
        </ButtonSync>
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

