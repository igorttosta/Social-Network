import { Button, CardContent, CardHeader, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CustomAppBar from '../../components/CustomAppBar';
import server from '../../api/server';
import CustomAvatar from '../../components/CustomAvatar/index';

interface Profile {
  _id: string;
  name: string;
  following: string[];
  followers: string[];
}

const Profiles = () => {
  const [ profiles, setProfiles] = useState<Profile[]>([]);
  const token = localStorage.getItem("accessToken");
  const actualProfileId = localStorage.getItem('profile');

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await server.get('/profiles', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        });
        setProfiles(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getProfiles();
  }, [token])

  const handleFollow = async (id: string) => {
    try {
      await server.post(`/profiles/${id}/follow`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });

      const newProfiles = profiles.map(profile => {
        if(profile._id === id) {
          return {
            ...profile,
            followers: [...profile.followers, id]
          }
        } else if(profile._id === actualProfileId) {
          return{
            ...profile,
            followers: [...profile.followers, actualProfileId]
          }
        } else {
          return profile;
        }
      })
      setProfiles(newProfiles);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <CustomAppBar title='Profiles'/>
      <div style={{ marginTop: "56px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="strech"
          spacing={2}
        >
          {profiles.map((profile) => (
            <div key={profile._id}>
              <Paper elevation={0}>
                <CardHeader
                  avatar={<CustomAvatar profileName={profile.name}/>}
                  title={profile.name}
                />
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant='body2' color='text.secundary'>
                      {profile.followers.length} Seguidores
                    </Typography>
                    <Typography variant='body2' color='text.secundary'>
                      {profile.following.length} Perfis
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Button variant='contained' onClick={() => handleFollow(profile._id)}>Seguir</Button>
                    </div>
                  </Stack>
                </CardContent>
              </Paper>
              <Divider />
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Profiles;