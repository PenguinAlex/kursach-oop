import {type} from "@testing-library/user-event/dist/type";
import {useEffect} from "react";

const CustomSelect = ({options, selectLabel, setPersons, setTime, time, persons, setAva, setUserInfo}) => {
    let opt = options
    function handleChange(e){
        let a = Number(e.target.value)

        if (time !== undefined){
            setTime([options[a], options[a+1], options[a+2]] )
          opt =  opt.slice(0, options.length-2)
        } else {
            setPersons(options[e.target.value])
        }
    }
    return <div><label>
        {selectLabel}
        <select
            onChange={handleChange}
            onClick={()=>{
                setAva([])
                setUserInfo(null)
            }}
        >
            {opt.map((el, i) =>
                <option
                    key={el}
                    value={i}
                >
                    {el}
                </option>
            )}
        </select>
    </label></div>
}


export default CustomSelect