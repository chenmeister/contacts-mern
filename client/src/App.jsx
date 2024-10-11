import AddContact from './pages/addContact'
import './App.css'

function App() {

  return (
    <>
      <div className="container">
        <nav>
          <div>
            <h1>Contacts List</h1>
          </div>
        </nav>

        <div className="contacts_list">
          <div className="right">
            <button>Add Contact</button>
          </div>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th></th>
            </tr>
            <tr>
              <td>Test</td>
              <td>User</td>
              <td>Edit, remove</td>
            </tr>
          </table>
        </div>

        <AddContact />
      </div>
    </>
  )
}

export default App
