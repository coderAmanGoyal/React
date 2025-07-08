                                    //Enquiry Form Handle with state using controlled components 
import { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle"
import {Col, Container, Row, Table} from 'react-bootstrap';
import { toast, ToastContainer} from 'react-toastify';

function App() {
  let [formData, setFormData] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    })

  let [userData, setUserData] = useState([])

  let getValue = (event) => {
    let oldData = {...formData};
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData)
  }

  let handleSubmit = (event) => {
    let currentUserFormData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage
    }

    event.preventDefault();

    if(formData.index === ""){
      
      let checkFilterUser = userData.filter((v) => v.uemail == formData.uemail || v.uphone == formData.uphone)
  
      if(checkFilterUser.length == 1) {
        toast.error("Email or Phone already Exists")  
      }
  
  
      else{
          let allUserData = [...userData, currentUserFormData];
          setUserData(allUserData);
          setFormData(
            {
              uname: '',
              uemail: '',
              uphone: '',
              umessage: '',
              index: ''
            })
          }
    }
    
    else {
        let checkFilterUser = userData.filter((v, i) => i != formData.index && v.uemail == formData.uemail || i != formData.index && v.uphone == formData.uphone)
  
        if(checkFilterUser.length == 1) {
        toast.error("Email or Phone already Exists")  
        }

        else{

          let editIndex = formData.index;
          let data = userData;
          data[editIndex]['uname'] = formData.uname
          data[editIndex]["uemail"] = formData.uemail
          data[editIndex]["uphone"] = formData.uphone
          data[editIndex]["umessage"] = formData.umessage
        

          setUserData(data);
          setFormData(
                {
                  uname: '',
                  uemail: '',
                  uphone: '',
                  umessage: '',
                  index: ''
                })
        }
    }
  }
  
      
    let deleteRow = (indexNumber) => {
      let filterDataAfterDelete = userData.filter((v, i) => i != indexNumber)
      setUserData(filterDataAfterDelete);
    }
  
    let editRow = (indexNumber) => {
      let editData = userData.filter((v,i) => i == indexNumber)[0] //editData has only one object in the array at 0 pasition by filter method, so to turning that into a object i used [0] at last of the line
      editData['index'] = indexNumber; //to add index in editData(object)
      setFormData(editData)
    }                                       
    
    


    return (
    <Container fluid>
      <Container>
        <Row>
          <Col className='text-center py-5'>
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit = {handleSubmit}>
              <div className='pb-3'>
                <label className='form-label' > Name </label>
                <input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control'/>
              </div>
              <div className='pb-3'>
                <label className='form-label' > Email </label>
                <input type='text' onChange={getValue} value={formData.uemail} name='uemail' className='form-control'/>
              </div>
              <div className='pb-3'>
                <label className='form-label' > Phone </label>
                <input type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control'/>
              </div>
              <div className='pb-3'>
                <label className='form-label' > Message </label>
                <textarea onChange={getValue} value={formData.umessage} name='umessage' rows={3} className='form-control'/>
              </div>
              <button className='btn btn-success'>
                {formData.index !== "" ? 'Update' : 'Save'}
              </button>
            </form>
          </Col>
          <Col lg={7}>
          <Table striped bordered className='mt-5'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone N.</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.length >= 1 ?
                userData.map((obj, i) => {
                  return  <tr key={i}>
                            <td>{i+1}</td>
                            <td>{obj.uname}</td>
                            <td>{obj.uemail}</td>
                            <td>{obj.uphone}</td>
                            <td>{obj.umessage}</td>
                            <td>
                              <button className='btn btn-primary' onClick={() => editRow(i)}>Edit</button>
                              <button className='ms-1 btn btn-danger' onClick={() => deleteRow(i)}>Delete</button>
                            </td>
                          </tr>
              })
              :
              <tr>
                <td colSpan={6}> No Data Fonud </td>
              </tr>
            }
            </tbody>
            
          </Table>
          </Col>
        </Row>
      </Container>
      
    <ToastContainer/>
    </Container>
  );
}
export default App;
