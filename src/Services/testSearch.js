import search from "./searchService.js";
import documents from '../documents/data.js'
import buildIndex from "../indexer.js";
const results = search("node backend");
console.log(search("backend"));

const index = buildIndex(documents);
console.log(index);
