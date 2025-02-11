import { Stack, Container, TextField, Button } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Dropzone from '../../components/Dropzone';
import CustomAppBar from '../../components/CustomAppBar';
import server from '../../api/server';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {

  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { title, description } = formData;
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if(selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      const response = await server.post('/posts', data, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });

      navigate('/home');

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <CustomAppBar title='NewPost'/>
        <Container sx={{ marginTop: 12 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <TextField 
                label='Título' 
                variant='standard' 
                name='title'
                value={formData.title} 
                onChange={handleInputChange}
              />
              {selectedFile ? null : 
                (<TextField 
                  label='O que está acontecendo?' 
                  variant='standard' 
                  name='description'
                  multiline 
                  minRows={3}
                  value={formData.description} 
                  onChange={handleInputChange} 
                />)
              }
              
              <Dropzone onFileUploaded={setSelectedFile}/>
              <Button 
                variant='contained' 
                type='submit'
              >
                Publicar
              </Button>
            </Stack>
          </form>
        </Container>
    </div>
  );
};

export default NewPost;