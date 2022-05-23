const axios = require("axios");
require("dotenv").config();

const feed = async () => {
  try {
    let config = {
      headers: { "X-Api-Key": process.env.NEWS_API_KEY },
      timeout: 1000,
      params: {
        country: "us",
        pageSize: 12,
        page: 1,
        category: "technology",
      },
    };

    let result = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      config
    );
    result = result.data;
    console.log(result);
    let data = {
      //   select_interest: resultinterest,
      //   user_interests: userObject.interests,
      page: result.page,
      total_pages: Math.ceil(
        parseInt(result.totalResults) / parseInt(result.page)
      ),
      page_size: result.page_size,
      articles: result.articles,
    };
    // console.log("interest: ", interest);
    // console.log("page ", page);
    // console.log(data);
    // res.json({ message: data });
  } catch (error) {
    console.log(error);
  }
};

feed();
