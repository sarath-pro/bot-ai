import data from './data.json'

export default class Bot {
    findQuestion = (question) => {
        console.log('finding response...')
        let obj = data.find((x)=>{
            // console.log(x.question.toLowerCase())
            // console.log(question.toLowerCase())
            return x.question.toLowerCase()===question.toLowerCase();
        })
            
        if(obj) {
            return obj.response
        }
        return "As an AI Language Model, I don't have the details."
    }
}
