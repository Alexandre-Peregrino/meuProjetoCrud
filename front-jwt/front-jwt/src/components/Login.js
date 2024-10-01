import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  //handleSubmit é a função que será executada quando o usuário clicar no botão de login
  const handleSubmit = async (event) => {
    event.preventDefault(); /* event.preventDefault() é usado para impedir que a página seja recarregada quando 
    o formulário for enviado. No HTML, o comportamento padrão de um formulário é recarregar a página, mas com 
    React, geralmente queremos evitar isso.*/

    /*Usamos o axios.post() para enviar os dados de email e senha para o servidor.*/
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        senha,
      }, { 

        /*withCredentials: true, é uma configuração que permite que os cookies sejam incluídos na requisição. 
        Isso é importante se o login utiliza sessões ou algum tipo de autenticação baseada em cookies.*/
        withCredentials: true,

      });

      // Você não precisa mais armazenar o token no localStorage
      //Atualiza o estado de autenticação no componente pai
      onLogin();
       
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;