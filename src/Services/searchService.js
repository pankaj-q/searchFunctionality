import documents from '../documents/data.js'
import buildIndex from '../indexer.js'
const index = buildIndex(documents);
const search = (query) => {
    const searchTerms = query.toLowerCase().trim().split(/\s+/);

const results = documents.map((document)=> {
    const text = `${document.title} ${document.content}`.toLowerCase();

    const score = {};
    searchTerms.forEach((term) => {
        const documentIds = index[term] || [];
        documentIds.forEach((documentId) => {
            if(!score[documentId]){
                score[documentId] = 0;
            }
            score[documentId]++;
        })
    });
    return Object.entries(score).map(([documentId,score]) => {
        const document = documents.find((doc) => {
            doc.id === Number(documentId)
        })
        return {
            ...document,
            score,
        };
    })
    .sort((a,b) => a.score - b.score);
});

};
export default search;