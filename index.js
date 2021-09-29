/* Event listener to call when a change happens */
document.addEventListener("DOMContentLoaded", async () => {
  runData('weekly');
});

/* Get the data from data.json */
async function loadData() {
  return (await fetch('data.json')).json();
}

/* Parse the data */
const runData = async (timeperiod) => {
  let data = [];
  try {
    data = await loadData();
  } catch (e) {
    console.log("Error: " + e);
  }
  otherFunctionality(data, timeperiod)
}

/* Add the other dynamic text and numerical values to thr form */
const otherFunctionality = (data, timeperiod) => {
  const categories = ['work', 'play', 'study', 'exercise', 'social', 'self_care'];
  let timecategory;
  switch(timeperiod) {
    case "daily":
      timecategory = "Yesterday";
      document.getElementById("option_01").classList.add('selected');
      document.getElementById("option_02").classList.remove('selected');
      document.getElementById("option_03").classList.remove('selected');
      break;
    case "weekly":
      timecategory = "Last Week";
      document.getElementById("option_01").classList.remove('selected');
      document.getElementById("option_02").classList.add('selected');
      document.getElementById("option_03").classList.remove('selected');
      break;
    case "monthly":
      timecategory = "Last Month";
      document.getElementById("option_01").classList.remove('selected');
      document.getElementById("option_02").classList.remove('selected');
      document.getElementById("option_03").classList.add('selected');
      break;
  }
  
  let i = 0;

  categories.forEach(e => {
    document.getElementById(`hours_${e.toString()}`).innerHTML = data[i].timeframes[timeperiod].current + 'hrs';
    document.getElementById(`previous_${e.toString()}`).innerHTML = timecategory + ' - ' + data[i].timeframes[timeperiod].previous + 'hrs';
    i++;
  })
};