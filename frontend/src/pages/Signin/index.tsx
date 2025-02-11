import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import server from '../../api/server';
import AuthForm from '../../components/AuthForm';

interface TokenUser {
  user: string,
  profile: string
}

const Singin = () => {
  const navigate = useNavigate();

  const handleLogin = async (user: string, password: string) => {
    try {
      const response = await server.post('/security/login', {
        user,
        password
      });
  
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      const decode = jwtDecode(accessToken) as TokenUser;
      localStorage.setItem('user', decode.user);
      localStorage.setItem('profile', decode.profile);
      navigate('/home');
    } catch (error) {
      alert('Não foi possivel realizar o login');
    }
    
  };

  return (
    <AuthForm 
      onSubmitForm={handleLogin}
      onSubmitButtonText='Login'
      onRouterText='Não tem uma conta? Faça o cadastro'
      onRouteLink='/register'
    />
  );
};

export default Singin;