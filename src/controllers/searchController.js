import search from '../Services/searchService.js'
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/AsyncHandler.js';
const searchDocuments = asyncHandler(async (req, res) => {
    const {q} = req.body;
    if(!q || !q.trim()){
        throw new ApiError(400, 'search query is required')
    }
    const results = search(q);
    return res.status(200).json( new ApiResponse (200, {
        query: q,
        count: results.length,
        results,
    },
    'search completed successfully'
      )
    )
  });

  export default searchDocuments;