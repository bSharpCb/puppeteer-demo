import sitesOutput from "./demo.js";

const results = (async () => {
    const data = await sitesOutput;
    console.log(`There are ${data.length} entries, and the first one is \r\n ${JSON.stringify(data[0])}`);
    return data;
})();

export default results;