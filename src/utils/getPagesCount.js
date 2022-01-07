// int pages count 

export const getPagesCount = (totalCount, limit) => {
    return Math.ceil(totalCount/ limit);
}

//array with nambers of pages
export const getPagesArray = (pagesCount) => {
    let pagesArray = [];
    for (let i = 0; i < pagesCount; i++) {
        pagesArray.push(i + 1);
    } 
    return pagesArray;
}