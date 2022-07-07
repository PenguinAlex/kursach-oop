import logo from '../../logo.svg';
import {useEffect, useState} from 'react';
import Form from '../Form/Form';
import Searching from "../../components/Searching";
import Restaurant from "../../components/Restaurant";


function App() {
    const [userInfo, setUserInfo] = useState(null)
    const [restaurant, setRestaurant] = useState(null)
    const [targetRest, setTargetRest] = useState()
    const [data, setData] = useState(()=>{
        fetch('http://localhost:8080/api/info')
            .then(response => response.json()).then(data => setData(data.map(el => JSON.parse(el))))
    });
    const [restaurants, setRestaurants] = useState(()=>{
        fetch('http://localhost:8080/api/rest')
            .then(response => response.json()).then(data => setRestaurants(data.map(el => JSON.parse(el))))
    })
    const [order, setOrder] = useState({persons: 0, time: '09:00'});
    const [ava, serAva] = useState([])

    const post = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
        fetch('https://reqres.in/api/posts', requestOptions)
            .then(response => response.json())

    }

   useEffect(() => {

    fetch('http://localhost:8080/api/info')
        .then(response => response.json()).then(data => setData(data.map(el => JSON.parse(el))))

  }, [order]);
  return (
    <div className="App">
      <header className="App-header">
          <Form data = {data} order={order} setOrder={setOrder} setAva = {serAva} setUserInfo={setUserInfo}/>
          <Restaurant ava={ava} restaurants={restaurants} setUserInfo = {setUserInfo} setTargetRest = {setTargetRest} order={order} targetRestaurant = {targetRest}/>
          {userInfo}
      </header>


    </div>
  );
}

export default App;
