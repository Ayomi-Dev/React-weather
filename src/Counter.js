import { useEffect, useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        console.log('Effect made')
        document.title = `Count: ${count}`
        
        return () => {
            console.log('clean itSSSSSSSS')
        }
    }, [count])

    

    return ( 
        <>
            <p>Counter: {count}</p>
            <button onClick= { increment } >Count</button>
        </>
     );
}
 
export default Counter;