import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [file, setFile] = useState(null); 
  const [data, setData] = useState([]);

  const handlesubmit=async ()=>{

    const formdata= new FormData();
    formdata.append('file',file);

    let result=await fetch('http://127.0.0.1:8000/api/upload-attendance',{
      method:'POST',
      body:formdata,
      });
      console.log("res",result)
      alert("Excel File has been imported Successfully");
  }
  const handleFileChange = (e) => {
 
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
   
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/show-attendance');
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setData(result); 
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    fetchData(); // Call the function to fetch data when component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <div className="App">
    <div className='container py-4'>
        <div className='row'>
    <div className='col-12'>
      <h2>Attendence System</h2>
    </div>
          <div className="col-6 ms-auto my-4">
       
              <h6 className=''>Upload Excel File</h6>
              <input type="file" className="border" onChange={handleFileChange} />
              <button type="button" onClick={handlesubmit} className='btn btn-success mx-2'>Submit</button>

          </div>
       <div className='col-12'>   
       <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Designation</th>
      <th scope="col">Check In</th>
      <th scope="col">Check Out</th>

      <th scope="col">Total Working Hours</th>
    </tr>
  </thead>
  <tbody>
    
  {data.map((item) => (
    <tr>
      <th >{item.id}</th>
      <td >{item.employee.name}</td>
      <td>{item.employee.designation}</td>
      <td>{item.check_in}</td>
      <td>{item.check_out}</td>
      <td>{item.working_hours}</td>

    </tr>
  ))}
  </tbody>
</table>
</div>
 </div>
 </div>
   
    </div>
  );
}

export default App;
