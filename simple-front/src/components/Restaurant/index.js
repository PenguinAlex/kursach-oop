import UserInfoForm from "../UserInfoForm";
import {MaxPersons} from "../../containers/Form/Form";
const Restaurant = ({ava, restaurants, setUserInfo, setTargetRest, order, targetRestaurant}) =>{
        let available = []
        ava.forEach(o => {
                if(!available.includes(o.restaurant_id)) {
                        available.push(o.restaurant_id)
                }
        })

        return<div>
            {(restaurants||[]).map(el =>{
                    let result = null
            if (available.includes(el.id)) {
                    return<div key={el.id}><label >
                            <input
                                defaultChecked
                                type = "radio"
                                value={el.id}
                                name = "restaurant"
                                onClick={(e)=>{
                                        console.log("here", e.target.value)
                                        setTargetRest(e.target.value)
                                        setUserInfo(<UserInfoForm order={order} ava={ava} targetRestaurant = {e.target.value}/>)

                                }
                                }
                            />
                            {el.name} свободных мест: {MaxPersons[el.id]}
                    </label></div>

            }

            })}
        </div>
}

export  default Restaurant