const refreshTokens = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/refreshToken', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Unable to refresh tokens');
      }
  
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      return true;
    } catch (error) {
      console.error('Unable to refresh tokens', error);
      return false;
    }
  };

  export { refreshTokens }