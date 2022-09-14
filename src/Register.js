import {useState} from 'react'
import './forms.css'
import {auth} from './firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import { db } from './firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { fireEvent } from '@testing-library/react'
 

//import {useAuthValue} from './AuthContext'


function Register() {

  const [email, setEmail] = useState('')
  const [nomecompl, setNomecompl] = useState('')
  const [cpf, setCPF] = useState('')
  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  
  
  const bookCollectionRef = collection(db, "usuarios");

  const optionsGrupos = [
    { label: 'selecione...', value: 'selecione...' },
    { label: 'Cond. Caribe Residence Resort / Palmas-TO', value: 'Cond. Caribe Residence Resort' },
    { label: 'Cond. Palmeira Dourada / Palmas-TO', value: 'Cond. Palmeira Dourada' },
    { label: 'Cond. Palmeira Real / Palmas - TO', value: 'Cond. Palmeira Real' },
    { label: 'Cond. Residencial Classic / Palmas - TO', value: 'Cond. Residencial Classic' },
    { label: 'Cond. Smart Residence / Palmas - TO', value: 'Cond. Smart Residence' },
    { label: 'Cond. Cotovia / Palmas - TO', value: 'Cond. Cotovia' },
    { label: 'Cond. Palmeira Imperial / Palmas - TO', value: 'Cond. Palmeira Imperial' },
    { label: 'Cond. Residencial Bella Villa / Palmas - TO', value: 'Cond. Res. Bella Villa' },
    { label: 'Cond. Polinésia Residence / Palmas - TO', value: 'Cond. Res. Polinésia' }
  ];

  const [valuegrup, setValuegrup] = useState('selecione...');

  const handleChange = (event) => {
    setValuegrup(event.target.value);
  };

  

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

 /* const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            setTimeActive(true)
            navigate('/verify-email')
          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  } */


  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
     
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          let user = userCredential.user;
         
          return addDoc(bookCollectionRef, {
              codigoIndica: null,
              nomeUser: nomecompl,
              documUser: cpf,
              grupoparceiro: valuegrup,
              emailUser: email,
              platformuser: 'android',
              dataCadastro:  Math.floor(Date.now()/1000),
              userFire: user.uid
            })
          
         // }).catch((err) => alert(err.message))
        }) 
        .catch(err => setError(err.message))
        navigate('/verify-email')
       
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  } 

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Criar Novo Usuário</h1>
        <h3>ToPago Cashback</h3>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
        <input 
            type='text' 
            value={nomecompl}
            placeholder="Informe seu nome"
            required
            onChange={e => setNomecompl(e.target.value)}/>

        <input 
            type='text' 
            value={cpf}
            maxLength='14'
            placeholder="Informe seu CPF"
            required
            onChange={e => setCPF(e.target.value)}/>
        
        <input 
            type='text' 
            value={telefone}
            placeholder="Informe seu Telefone"
            required
            onChange={e => setTelefone(e.target.value)}/>

          <input 
            type='email' 
            value={email}
            placeholder="Informe seu email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Informe a senha'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirme a senha'
            onChange={e => setConfirmPassword(e.target.value)}/>

            
            <select value={valuegrup} onChange={handleChange}>
                {optionsGrupos.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
             
          <button type='submit'>Registrar</button>
        </form>
        <span>
          Já tem uma conta?   
           - <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register