import LetterInterface from "./letterInterface";

interface PraiseInterface {
    id:number,
    title:string,
    type:string,
    tone:string,
    letters:LetterInterface[]
};

export default PraiseInterface;