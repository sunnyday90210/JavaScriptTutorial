const http = new XMLHttpRequest();
const url =
  'https://gist.githubusercontent.com/scottburton11/66a921c458f9500a773a6b0ac65006df/raw/629bfd6a3125e3428bd85a53231bd8018c407a65/Javascript%2520Working%2520With%2520Data%2520Challenge%2520data';
const method = 'GET';

http.open(method, url);
http.onreadystatechange = () => {
  if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
    const data = JSON.parse(http.responseText);
    const topRes = data.filter(function(value) {
      return value['Cool Factor'] >= 7;
    });
    const finalRes = topRes
      .sort((a, b) => (a['Total Score'] < b['Total Score'] ? 1 : -1))
      .slice(0, 10);
    // console.log(finalRes);
    let fullName = finalRes
      .map(function(name) {
        return `<div class="card"><div class="car-title">${
          name.Year
        } ${name.Make} ${name.Model}</div><div class="total-score">${name['Total Score']}</div></div>`;
      })
      .join('');

    document.getElementById('card-container').innerHTML = fullName;
    console.log(fullName);
  } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
    console.log('Error!');
  }
};

http.send();
