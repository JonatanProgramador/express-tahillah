import LetterInterface from "./LetterInterface";

interface PraiseInterface {
    _id:string,
    title:string,
    type:string,
    tone:string,
    author:string,
    track:string
    letters:LetterInterface[]
};

export default PraiseInterface;