// LoginRegisterPage.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Tabs, Tab } from '@mui/material';
import { login, register } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginRegisterPage = () => {
  const location = useLocation();
  const [loginMode, setLoginMode] = useState(location.state?.register ? 1 : 0); // 0=login, 1=register

  const [formRegister, setFormRegister] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    fileImageProfile: null as File | null
  });

  const [formLogin, setFormLogin] = useState({
    UserName: '',
    Password: '',
    Email: ''
  });

const navigate= useNavigate();

  const handleChangeTab = (_event: any, newValue: number) => {
    setLoginMode(newValue);
    if (newValue === 1)
      setFormRegister({ id: '', name: '', email: '', password: '', fileImageProfile: null });
    else
      setFormLogin({ UserName: '', Password: '', Email: '' });
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (loginMode === 1) {
      if (name === 'fileImageProfile' && files && files.length > 0) {
        setFormRegister(prev => ({ ...prev, fileImageProfile: files[0] }));
      } else {
        setFormRegister(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormLogin(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (loginMode === 1) {
    // Register
    if (!formRegister.email || !formRegister.password || !formRegister.name) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await register(formRegister);
      alert('Registration successful!');
      navigate('/Home');  // מעבר לדף הבית אחרי רישום
    } catch (error) {
      alert('Registration failed.');
      console.error(error);
    }
  } else {
    // Login
    if (!formLogin.UserName || !formLogin.Email || !formLogin.Password) {
      alert('Please enter UserName, Email and Password');
      return;
    }

    try {
      const result = await login({
        UserName: formLogin.UserName,
        Email: formLogin.Email,
        Password: formLogin.Password
      });
      sessionStorage.setItem('token', typeof result === 'string' ? result : result.token);
      alert('Login successful!');
      navigate('/');  // מעבר לדף הבית אחרי התחברות
    } catch (error) {
      alert('Login failed.');
      console.error(error);
    }
  }
};


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {loginMode === 0 ? 'Login' : 'Register'}
        </Typography>

        <Tabs value={loginMode} onChange={handleChangeTab}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

          <TextField
            label="UserName"
            name="UserName"
            fullWidth
            margin="normal"
            value={loginMode === 1 ? formRegister.name : formLogin.UserName}
            onChange={handleInputChange}
          />

          <TextField
            label="Email"
            name="Email"
            fullWidth
            margin="normal"
            value={loginMode === 1 ? formRegister.email : formLogin.Email}
            onChange={handleInputChange}
          />

          <TextField
            label="Password"
            name="Password"
            type="password"
            fullWidth
            margin="normal"
            value={loginMode === 1 ? formRegister.password : formLogin.Password}
            onChange={handleInputChange}
          />

          {loginMode === 1 && (
            <TextField
              fullWidth
              label="Profile Image"
              margin="normal"
              variant="outlined"
              name="fileImageProfile"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
            />
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: '#1976d2', color: '#fff', fontWeight: 700, '&:hover': { background: '#90caf9', color: '#1976d2' } }}>
            {loginMode === 0 ? 'Login' : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginRegisterPage;

