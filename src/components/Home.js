import React, {  useState } from "react";
import { BiSearchAlt } from "react-icons/bi"
import { BsWind } from "react-icons/bs"
import { WiHumidity } from "react-icons/wi"
import { BsCloudsFill } from "react-icons/bs"
import {BsFillCloudDrizzleFill} from "react-icons/bs"
import { BsFillSunFill } from "react-icons/bs"
import img from "../images/whether.png"
import 
{
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function Home()
{
    const [apidata, setapidata] = useState( "" )
    const [error, seterror] = useState( "" )
    const [city,setcity]=useState("")
    const [condition,setcondition]=useState()
    const usercity=async (e)=>{
        e.preventDefault();


        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be953bcaf98ff286f55f8df8bd1f1ccc&&units=metric`
        try
        {
            const result = await axios.get( url )
            console.log(result)

            setapidata( { ...apidata, name: result.data.name, temp: result.data.main.temp, pressure: result.data.main.pressure, Feellike: result.data.main.feels_like, wind: result.data.wind.speed, humidity: result.data.main.humidity} )
            setcondition(result.data.weather[0].main )
            console.log(condition)
          
         
        }

        catch ( err )
        {
            if ( err )
            {
                seterror( err.message )
                console.log( error )
            }

        }
       

}
    


    return (

        <section className="vh-100" style={ { backgroundColor: "#f5f6f7" } }>
            
            <MDBContainer className="h-100 ">
                <MDBRow className="justify-content-center align-items-center h-100 ">
                    <MDBCol md="10" lg="8" xl="6">
                        <h1 className="text-center shadow-sm rounded-5"> Whether Info</h1>
                        <div className="d-flex mx-5 " >

                             <form onSubmit={usercity} className="d-flex w-100">
                           <input type='search' placeholder='Serach city ' className="shadow border-0 w-100 my-1 rounded-3 p-2"  onChange={(e)=>{setcity(e.target.value)}} required/>
   
                       {city!=="" &&
                            <button className="my-1 shadow mx-3 btn btn-outline-secondary  "><BiSearchAlt  className="fs-3 text-center "  type="submit" /></button>}
                                        
                            </form>

                        </div>

                        <MDBCard
                            className="bg-light text-white "
                            style={ { borderRadius: "40px" } }>

                            <div className="shadow " style={ { borderRadius: "40px", background: "#fff" } }>

                                <MDBCardImage
                                    src={img}
                                    className="card-img bg-dark"
                                    alt="weather"
                                    style={ { borderRadius: "40px", border: 0,height:"300px",opacity:0.7} }
                                />

                                <div
                                    className="mask  "
                                    style={ { backgroundColor: "rgba(190, 216, 232, .5)" } }
                                ></div>
                            </div>
                            <div className="card-img-overlay text-dark  text-center" style={ { overflow: "hidden", borderRadius: "40px" } }>
                                <MDBTypography tag="h4" className="mb-0">{apidata.name}
                                </MDBTypography>
                               

                               {/* conditons*/} 

                                
                                   {condition==="Clouds"&& <BsCloudsFill className="fs-3 m-2"/>}
                                
                                { condition === "Haze" && <BsCloudsFill className="fs-3 m-2" /> }
                                { condition === "haze" && <BsCloudsFill className="fs-3 m-2" /> }
                                { condition === "Clear" && <BsFillSunFill className="fs-3 m-2" /> }


                                { condition === "Drizzle || drizzle" && <BsFillCloudDrizzleFill className="fs-3 m-2" /> }

                                <div>

                                </div>
                                <p className="display-2 fs-2">Degress: &nbsp;{ apidata.temp } °C</p>
                                <p className="display-2 fs-2 ">Pressure: &nbsp;{ apidata.pressure } N/m<sup>2</sup></p>
                                <p className=" fs-6">
                                    Feels_Like: <strong>{ apidata.Feellike } °C</strong>
                                </p>
                                <div className="d-flex justify-content-between ">
                                    <h6 className=" " >Wind: { apidata.wind } <BsWind  className="mx-2"/></h6>
                                    <h6 className="  " >Humidity:{ apidata.humidity }  <WiHumidity/></h6>
                                </div>
                            </div>

                            
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}