import React, { useState } from 'react';
import { Stack, Container, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './index.css';

interface Props {
    onSubmitForm: any,
    onSubmitButtonText: string,
    onRouterText: string,
    onRouteLink: string 
}


const AuthForm = ({ onSubmitForm, onSubmitButtonText, onRouterText, onRouteLink }: Props) => {
    const [user, setUser] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitForm(user.value, password.value);
      };

    return(
        <div>
            <Container maxWidth='sm'>
                <form 
                    onSubmit={ (e) => { 
                        handleSubmit(e);
                    }}
                >
                    <Stack 
                        spacing={6}
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <img src={logo} alt='Logo' className='logo' />
                        <Stack 
                        spacing={6}
                        direction='column'
                        justifyContent='center'
                        alignItems='strech'
                        >
                        <TextField 
                            variant='outlined' 
                            label='Usuário' 
                            name='user' 
                            value={user.value} 
                            onChange={(e) => setUser({ value: e.target.value, error: '' })} 
                        />
                        <TextField 
                            type='password'
                            variant='outlined' 
                            label='Senha'
                            value={password.value}
                            onChange={(e) => setPassword({ value: e.target.value, error: '' })} 
                        />
                        <Button variant='contained' type='submit'>
                            {onSubmitButtonText}
                        </Button>
                        <Link to={onRouteLink}>{onRouterText}</Link>
                        </Stack>
                    </Stack>
                </form>
            </Container>
        </div>
    )
}

export default AuthForm;