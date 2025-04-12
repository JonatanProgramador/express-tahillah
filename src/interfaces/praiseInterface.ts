import LetterInterface from "./letterInterface";

interface PraiseInterface {
    _id:string,
    title:string,
    type:string,
    tone:string,
    letters:LetterInterface[]
};

export default PraiseInterface;