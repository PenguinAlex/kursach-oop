import React, {useState} from "react";
import CustomSelect from "../../components/CustomSelect";
import Restaurant from "../../components/Restaurant";
export const MaxPersons = []

const Form = ({data,order, setOrder, setAva,setUserInfo}) =>{
    const [persons, setPersons] = useState(1)
    const [time, setTime] = useState(['09:00','10:00', '11:00'])
    const handleSubmit = (e) => {
        setUserInfo(null)
        let ava = []
        let result = []
        let a = order
        a.time  = time
        a.persons = persons
        setOrder(a)
        console.log(order)
        e.preventDefault()
        data.forEach((el) =>{

            if ((el.time == null ||
                    !(el.time.includes(time[0] + ":00") ||
                        el.time.includes(time[1] + ":00") ||
                            el.time.includes(time[2] + ":00")))){
                ava.push(el)
            }
        })
        ava.forEach(el => {MaxPersons[el.restaurant_id] !== undefined? MaxPersons[el.restaurant_id] += el.persons: MaxPersons[el.restaurant_id] = el.persons })
        ava.forEach(el => {
            if (order.persons <= MaxPersons[el.restaurant_id]) {
                result.push(el)
            }
        })
        console.log(result)
        setAva(result)
        // let url = new URL("http://localhost:8080/api/rest")
        // url.search = new URLSearchParams(order).toString();

        //console.log(url.toString())

    }
    let personsOp = []
    for (let i = 1; i <= 34; i++){
        personsOp.push(i)
    }
    let timeOp = []
    for (let i = 9; i <= 23; i++){
        timeOp.push((i<10?"0":'')+i+":00")
    }
   return(
       <div>
            <form
                onSubmit={handleSubmit}
            >
                <CustomSelect
                    setPersons = {setPersons}
                    persons={persons}
                options={personsOp}
                selectLabel={"Выберите количество поситителей"}
                    setAva = {setAva}
                    setUserInfo={setUserInfo}
                />
                <CustomSelect
                        time={time}
                    setTime = {setTime}
                    options={timeOp}
                    selectLabel={"Выберите предподчтительное время"}
                        setAva = {setAva}
                        setUserInfo={setUserInfo}

                />
                <input type="submit" value="Найти ресторан"/>
            </form>
       </div>
   )
}
export default Form