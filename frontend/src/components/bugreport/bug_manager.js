import Modal from '../utils/modal.js'
import Hero from '../utils/hero.jsx';
import BugCreator from './bugcreator'
import { useState, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function BugManager(props) {

  var [users, setUsers] = useState();
  var [error, setError] = useState([]);
  
  // grid setup
  const columns = [
    {key: '_id', name: 'ID'},
    {key: 'created', name: 'Created At'},
    {key: 'bug', name: 'Issue Faced'},
  ]

  useEffect(() => {
    // fetch data on component render
    axios.get("http://localhost:8000/bug-report/")
      .then(response => {
        // console.log(response);
        console.log("fetching data...");
        setUsers(response.data);
      })
      .catch(error => {
        setUsers([]);
        setError(error);
      })
  }, [])

  return <>
    <Hero title="Bug Report" className="border border-green-500">

        <div className="button-row flex flex-wrap justify-items-stretch w-full">

            <Modal 
              classname="p-3 m-3 flex-grow w-full " 
              buttonName="Report Bug" 
              title="Report the issue faced" 
              header_icon="home" 
              button_icon="shield"
            >
              {
                  // Bug creation logic goes here
              }
              <BugCreator/>
          </Modal>
        </div>

        <br/>

        {
          // this sucks man 
          // least convenient way of adding comments
        }

        {users && 
          <DataGrid columns={columns} rows={users} className="w-full m-3"/>
        }
        {!users && 
          <h3> Could not find users :( </h3>
        }

    </Hero>
  </>
}