import PhoneInput from "react-phone-input-2";
import {useState} from "react";

const UserInfoForm = ({order, ava, targetRestaurant}) =>{
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const handleSubmit = (e) =>{
        console.log(targetRestaurant)
        let pers = order.persons
        let tables = []
        ava.forEach(el =>{
            if (el.restaurant_id.toString() === targetRestaurant){
                console.log(el)
                if (pers>0){
                    console.log(pers)
                    pers -= el.persons
                    tables.push(el.id)
                }
            }
        })
        console.log("here",tables)
        let a = {
            tables: tables,
            restaurant: targetRestaurant,
            persons:order.persons,
            time: order.time,
            phone:phone,
            name:name
        }
        let url = new URL("http://localhost:8080/api/order")
        url.search = new URLSearchParams(a).toString();
        fetch(url).then(response => response.json()).then(data => console.log(data) )
        console.log(url.toString())

    }
    return <div> <form
    onSubmit={handleSubmit}
    >
        <PhoneInput
            inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
            }}
            country={'ru'}
            value={phone}
            onChange={ph=>setPhone(ph)}

        />
        <label>
            <input  required type="text" value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <input type="submit" value="Забронировать"/>
    </form>
    </div>


}

export default UserInfoForm