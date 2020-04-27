import React, { useRef, useState } from 'react';
import './ImageUpload.css';
import Button from './Button';

const ImageUpload = props => {
  const filePickerRef = useRef();
  
  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  const pickedHandler = e => {
    console.log(e.target);
  }

  return (
    <div className="form-control">
      <input 
        type="file" 
        ref={filePickerRef}
        id={props.id} 
        style={{display: "none"}} 
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview"/>
        </div>
        <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
      </div>
    </div>
  );
}

export default ImageUpload;
