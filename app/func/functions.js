

export function getOrdinalSuffix(number) {
  const suffixes = ["st", "nd", "rd", "th"];
  const remainder = number % 10;
  const suffix = suffixes[remainder - 1] || suffixes[3];
  return `${number}${suffix}`;
}

export function loadData(dataKey, setData,array) {
  const newData = [];
  const newLabels = [];

  array.forEach((element, index) => {
    newData.push(element[dataKey]);
    newLabels.push(getOrdinalSuffix(index + 1));
  });

  setData({
    labels: newLabels,
    datasets: [
      {
        data: newData.length>0?newData:[0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  });
}


export function loadSessionDates(sessions,setCommitsData) {
  // Sort sessions by date in descending order
  const sortedSessions = sessions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Initialize an array to store the count values
  let countValues = [];

  // Assign count values based on recency
  sortedSessions.forEach((session, index) => {
    if (index < 1) {
      countValues.push({ date: session.date, count: 1 });
    }else if (index < 2){
      countValues.push({ date: session.date, count: 1 });
    } else if (index < 4) {
      countValues.push({ date: session.date, count: 1 });
    } else {
      countValues.push({ date: session.date, count: 1 });
    }
  });

  // Update the commitsData state with the newly calculated count values
  setCommitsData(countValues);
}

export function formatDate(dateString) {
  
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}