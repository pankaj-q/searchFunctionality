const buildIndex = (documents) => {
    const index = {};
    documents.forEach((document) => {
        const text = `${document.title} ${document.content}`.toLowerCase();
        const words = text.split(/\w+/).filter(Boolean);
        words.forEach((word) => {
          if(!index[word]) {
            index[word] =[];
          }
          if(!index[word].includes(document.id)){
            index[word].push(document.id);
          }
        })
    })
    return index;
}
export default buildIndex;