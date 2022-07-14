class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  } // queryStr is value  of our keyword.

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // i means case insensetive
          },
        }
      : {};
    //console.log(keyword)
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter----------------------
  filter() {
    // we are creating to filer by category.
    const queryCopy = { ...this.queryStr }; // we create copy of original querystr
    //console.log(queryCopy)

    // now we remove some fiedls this following...
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    //console.log(queryCopy)

    // Filer for Price and Rating-------------
    console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy); // first we convert querycopy is object so convert into string.
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    console.log(queryStr);
    //this.query = this.query.find(queryCopy); //-----this.query means--====> product.find()

    return this;
  }

  // --------pagination-------
  pagination(resultPerPage) {
    const currentpage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentpage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;

