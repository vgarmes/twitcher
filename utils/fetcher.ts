import axios from 'axios';

const fetcher = (url: string, config?: any) =>
  axios.get(url, config).then((res) => res.data);

export default fetcher;
