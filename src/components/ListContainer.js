import React, {useState} from 'react';
import styled from 'styled-components/native';

const Area = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;
const Card = styled.TouchableHighlight`
  border: 1px solid #64C1E8;
  width:90%;
  height: 80px;
  border-radius: 15px;
  margin: 5px;
  padding:10px;
  justify-content:center;
  background-color: ${props=>props.bgcolor};
`;
const Delbutton = styled.TouchableHighlight`
 margin-left:-40px;
`;
const Img = styled.Image`
`;
const Item = styled.Text`
  font-size:16px;
`;
const ListContainer = props => {
  const [touch, setTouch] = useState(false);
  
  let done = '';
  const marcar = () => {
    setTouch(!touch);
    if (touch == false) {
      done = 'não'
    } else {
      done = 'sim'
    }

    fetch(`${props.url}/${props.data.id}`, {
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        done:done
      })
    })
      .then(r => r.json())
      .then(json=>{})
    
  }

  const deletar = () => {
    fetch(`${props.url}/${props.data.id}`, {
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
      .then(r => r.json())
      .then(json=>{
        alert('Item excluido com sucesso!');
      })
  }
    return(
        <Area>
          <Card underlayColor="#64E8C7" bgcolor={touch?'#7AFBFF':'#91FF89'} onPress={marcar}>
            <Item>{props.data.item}</Item>
          </Card>
          <Delbutton underlayColor="transparent" onPress={deletar}>
            <Img source={require('../img/cancel.png')} />
          </Delbutton>
        </Area>
    )
}

export default ListContainer;