import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import server from '../../api/server';

const Singup = () => {
  const navigate = useNavigate();

  const handleRegister = async(user: string, password: string) => {
    try {
      const response = await server.post('/security/register', {
        user,
        password
      });
      navigate('/');
    } catch (error) {
      alert('Não foi possivel criar o usuario');
    }
  }

  return (
    <AuthForm 
      onSubmitForm={handleRegister}
      onSubmitButtonText='Cadastrar'
      onRouterText='Já tem uma conta? Faça o login'
      onRouteLink='/'
    />
  );
};

export default Singup;