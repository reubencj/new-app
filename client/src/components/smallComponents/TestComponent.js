import React, { useEffect, useState } from "react";
import axios from "axios";

const TestComponent = (props) => {
  // Note the second argument is an empty array
  let config = {'Authorization': "EQypcscLxup21tBL2U0SzpEEQ0C3kfX5iMtfkLOqioc"};
  //axios.defaults.headers.common["EQypcscLxup21tBL2U0SzpEEQ0C3kfX5iMtfkLOqioc"];
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.newscatcherapi.com/v2/search?q=Tesla&lang=en&sort_by=relevancy&page=1", {headers:config}
      )
      .then((response) => {
        setResponseData(response.data);
        
      })
      .catch(err => console.log(err));
  }, []); // This empty array forces useEffect to render ONLY when the component first renders
  return <div>{responseData}</div>;
};

export default TestComponent;
