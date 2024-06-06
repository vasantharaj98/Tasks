import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import authHeader from '../../services/auth-header';

const API_URL = process.env.REACT_APP_API_URL;


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CloudUpload({setFile, file, setLoader}) {

  function getImageNameWithoutExtension(url) {
    // Split the URL by "/"
    const parts = url.split('/');
    // Get the last part of the URL, which should be the image name with the extension
    const imageNameWithExtension = parts[parts.length - 1];
    // Split the image name by "." to separate the name and extension
    const [imageName, extension] = imageNameWithExtension.split('.');
    // Return only the image name
    return imageName;
  }
  

  const handleFileChange = async (event) => {
    console.log(file);
    setLoader(true);
    if(file === null){
      try {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        const response = await axios.post(API_URL + 'api/image/upload', formData, { headers: authHeader() });
        setFile(response.data.data.url);
        setLoader(false)
      } catch (error) {
        setLoader(false)
      } finally {
        setLoader(false)
      }
    }
    else{
      try {
        const imageName = getImageNameWithoutExtension(file);
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        const response = await axios.post(API_URL + `api/image/update/${imageName}`, formData, { headers: authHeader() });
        setFile(response.data.data.url);
        setLoader(false)
      } catch (error) {
        setLoader(false)
      } finally {
        setLoader(false)
      }
    }
  };

  return (
    <Button sx={{width: '100%', py: 4, mt: 2}} size='large' component="label" variant="outlined" startIcon={!file && <CloudUploadIcon />}>
      {!file ? 'Upload Image' :
      <img src={file} width={100} alt='img'></img>}
      <VisuallyHiddenInput onChange={handleFileChange} type="file" />
    </Button>
  );
}