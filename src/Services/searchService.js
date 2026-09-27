import documents from '../documents/data.js'
const search = (query) => {
    const searchTerms = query.toLowerCase().trim().split(/\s+/);

const results = documents.map((document)=> {
    const text = `${document.title} ${document.content}`.toLowerCase();

    let score = 0;
    searchTerms.forEach((term) => {
      if(text.includes(term)) {
        score++;
      };
    })
    return {
        document,
        score,
    };
}) 
.filter((document)=> document.score > 0).sort((a, b) => b.score - a.score);
return results;
};
export default search;