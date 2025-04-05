import LetterInterface from "./letterInterface";

interface PraiseInterface {
    id:number,
    title:string,
    type:string,
    tone:string,
    letter:LetterInterface[]
};

export default PraiseInterface;