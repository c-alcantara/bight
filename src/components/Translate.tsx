import axios from 'axios';

const Translate = async (lang: string, targetLang: string, text: string): Promise<string> => {
  try {
    
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${lang}&tl=${targetLang}&dt=t&q=${encodeURI(text)}`;
    const response = await axios.get(url);
   
    const data = response.data;
    return data[0][0][0];
  } catch (error) {
    alert('An error occurred. Please try again.');
    console.error('Translation Error:', error);
    return '';
  }
};

export default Translate;
