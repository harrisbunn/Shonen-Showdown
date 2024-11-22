import axios from 'axios';

interface ImageData {
  image_url: string;
  large_image_url: string;
}

interface APIResponse {
  data: ImageData[];
}

export const getCharacterImage = async (id: number): Promise<ImageData[]> => {
  try {
    const response = await axios.get<APIResponse>(`https://api.jikan.moe/v4/characters/${id}/pictures`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching character images:', error);
    throw error; 
  }
};
