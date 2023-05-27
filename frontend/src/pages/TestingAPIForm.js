import React, { useState, useRef,useEffect } from 'react';
import './TestingAPIForm.css'
import axios from 'axios';
import {useReactToPrint} from "react-to-print";

const TestingAPIForm = () => {
  const componentPDF=useRef();
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [format, setFormat] = useState('');
  const [user, setUser] = useState([]);

  
  

    useEffect( ()=>{
       
         axios.get("http://localhost:8001/")  
         .then(res=>setUser(res.data) )
         .catch(err=>console.log(err)); 
    },[]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8001/',{firstName,lastName,NIC,address,phoneNo,gender,email,profession,country,education})
    .then(res=>{
      console.log(res);
    }).catch(err=>console.log(err));
  }

  const handleSubmitDownload = (event) => {
    event.preventDefault();
    console.log(format);
  }

  const generatePDF=useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"Data",
    onAfterPrint:()=>alert("Data Saved In PDF")
  })
  return (
    <div>
    
        <div className="Testing">
        <form onSubmit={handleSubmit}>
        
            <label htmlFor="firstName">First Name:</label>
            <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="NIC">NIC:</label>
            <input
            type="text"
            id="NIC"
            value={NIC}
            onChange={(event) => setNIC(event.target.value)}
            required
            />
            <label htmlFor="address">Address:</label>
            <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            />
            <label htmlFor="phoneNO">Phone NO:</label>
            <input
            type="tel"
            id="phoneNO"
            value={phoneNo}
            onChange={(event) => setPhoneNo(event.target.value)}
            required
            />
            <label htmlFor="gender">Gender:</label>
            <select required value={gender}
                onChange={(e)=> setGender(e.target.value)}>
                <option value="">None</option>    
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <label htmlFor="email">email:</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            />
            
            <label htmlFor="profession">Profession:</label>
            <input
            type="text"
            id="profession"
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            required
            />

            <label htmlFor="country">Country:</label>
            <input
            type="text"
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            />

            <label htmlFor="education">Education:</label>
            <input
            type="textarea"
            size="100"
            id="education"
            
            value={education}
            onChange={(event) => setEducation(event.target.value)}
            required
            />
        

            <br></br>
            <button type="submit">SignUp</button>
        </form>
        
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div ref={componentPDF} style={{ width:'100%' }}>
         {
                                user.map( (user, i)=>(
                                  <table>
                                  <tr key={i}>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>NIC</th>
                                <th>Address</th>
                                <th>Phone No</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Profession</th>
                                <th>Country</th>
                                <th>Education</th>
                                </tr>

                                 <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.NIC}</td>
                                <td>{user.address}</td>
                                <td>{user.phoneNo}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>{user.profession}</td>
                                <td>{user.country}</td>
                                <td>{user.education}</td>
                                </tr>

                                </table>
                            
                            )) }
                          </div>
            <form onSubmit={handleSubmitDownload}>
            <h3>Download the file</h3>

            <label htmlFor="format">Format:</label>
            <select required value={format}
                onChange={(e)=> setFormat(e.target.value)}>
                <option value="">None</option>    
                <option value="Word">Word</option>
                <option value="PDF">PDF</option>
            </select>
            <br></br>
            <br></br>
            <button onClick={generatePDF} type="submit">Download</button>
            </form>
          
       
    </div>
  );
};

export default TestingAPIForm;
