import React, {useState, useEffect} from 'react'
import api from './api'


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormdata] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data)
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormdata({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormdata({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return(
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
           <a className='navbar-brand' href='#'>Finance App</a>
        </div>
      </nav>
    </div>
  )
}

export default App;
