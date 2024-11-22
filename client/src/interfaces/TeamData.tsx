import { CharacterData } from './CharacterData';

export interface TeamData {
    id: number;
    name: string;
    userId?: number;
    characters: CharacterData[];
}
