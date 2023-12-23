'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const APP_BASE_URL = process.env.APP_BASE_URL;
  const REMOVE_CSV_BASE64_PREFIX = /^data:text\/\w+;base64,/;

  const [csvBase64, setCsvBase64] = useState<string>('');

  const onChange = (e: any) => {
    const file = e.target.files[0] as File;

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = ({ target }) => {
      if (target?.result) {
        const base64String = (target.result as string).replace(
          REMOVE_CSV_BASE64_PREFIX,
          ''
        );

        setCsvBase64(base64String);
      }
    };

    reader.readAsDataURL(file);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', csvBase64);

    try {
      const response = await axios.post(
        `${APP_BASE_URL}/api/import-csv`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <main style={{ backgroundColor: 'white', width: '100vw', height: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '50px',
        }}
      >
        <input type='file' name='csvFile' accept='.csv' onChange={onChange} />
        <button type='button' onClick={uploadFile}>
          Submit
        </button>
      </div>
    </main>
  );
}
