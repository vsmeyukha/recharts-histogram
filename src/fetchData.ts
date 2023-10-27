'use server'

const fetchData = async () => {
  const response = await fetch('https://64786558362560649a2dafb1.mockapi.io/test-endpoint');
  const data = await response.json();
}

export default fetchData;