import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
  },
});

const postData = async (url, data) => {
  return await axiosInstance.post(url, data)
}

const getData = async (url) => {
  try {
    return await axiosInstance.get(url)
  } catch (e) {
    console.log(e.message)
  }
}

export { postData, getData }
