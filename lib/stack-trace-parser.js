const regex = /at.* \({0,1}(.*|\w*):(.*):\d*/;

function parser(data) {
  return data.split('\n').map((line) => {
    const res = line.match(regex);
    if (!res) {
      return null;
    }

    return {
      filename: res[1],
      line: Number(res[2]),
    };
  }).filter((i) => !!i);
}

module.exports = parser;
