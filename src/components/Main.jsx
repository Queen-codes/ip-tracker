//import Pattern from "../assets/pattern-bg.png"
import React, {useState, useEffect} from 'react'
import ArrowIcon from "../assets/icon-arrow.svg"
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
//import 'leaflet/dist/leaflet.css'


function Main() {
    const[formData, setFormData] = useState('')
    const[ip, setIp] = useState('')
    const[location, setLocation] = useState('')
    const[country, setCountry] = useState('')
    const[isp, setIsp] = useState('')
    const[timeZone, setTimeZone] = useState('') 
    const[map, setMap] = useState (undefined)

   // console.log(map)
   //console.log(map)

    async function fetchedData () {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_VmjWxSGUqueyljV8JUuaro3W4hynK&ipAddress=${formData}`);
        const data = await res.json();
        //console.log(data)
        setIp(data.ip)
        setLocation(data.location.city)
        setCountry(data.location.country)
        setIsp(data.isp)
        setTimeZone(data.location.timezone)
        const{location: {lat, lng}} = data
        setMap({lat, lng})
    }

    useEffect(() => {
        fetchedData()
    }, [])

    function getDetails (e) {
        e.preventDefault()
       fetchedData()
    }

  return (
    <>
    <div className='header'>
        <h1 className='header--title'>IP Address Tracker</h1>
        <form className="form" onSubmit={getDetails}>
            <input type="text"
            name='ipAdress'
            onChange={e => setFormData(e.target.value)}
            value={formData}
            placeholder='Search for any IP address or domain'
            className='form--input'
            />

            <button className='form--submit'><img src={ArrowIcon} alt="" /></button>
        </form>

        <div className="ip-details">

            <section className="address">
                <span className="address-title title">IP Address</span>
                <span className='ip--address sub'>{ip}</span>
            </section>

            <section className="location">
                <span className="location-title title">Location</span>
                <span className="ip-location sub">{location}, {country}</span>
            </section>

            <section className="timezone">
                <span className="timezone-title title">TimeZone</span>
                <span className="ip-timezone sub">{timeZone}</span>
            </section>

            <section className="isp">
                <span className="isp-title title">ISP</span>
                <span className="ip-isp sub">{isp}</span>
            </section>
        </div>
       
    </div>

    {
   
   map === undefined? <div className="loader"></div> :
    <MapContainer id='map' center={map} zoom={13} scrollWheelZoom={false} >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={map} >
            <Popup>
            You're here.
            </Popup>
        </Marker>
    </MapContainer>
 }
 </>
    
)

} 

export default Main;