/* Global Variables */

const apiKey ='YOUR KEY';
let apiUrl = ''; 
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', async () => {
    // Get zipCode value when button is clicked
    const zipCode = zipInput.value; 
    const feelings = feelingsInput.value;
    
   
    apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${zipCode}&appid=${apiKey}&units=metric`;

    try {
        const data = await getWeather(apiUrl, zipCode, apiKey);
        if (data && data.main && data.main.temp) {
            await postData('/getData', { temperature: data.main.temp, date: newDate, userResponse: feelings });
            retrieveData();
        } else {
            throw new Error('Temperature data not available');
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

//Function to GET weather data
const getWeather = async (apiUrl, zipCode, apiKey) => {
    const response = await fetch(`${apiUrl}&zip=${zipCode}&appid=${apiKey}&units=metric`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

//Function to POST weather data
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
        throw error; 
    }
}

//Function to update UI
async function retrieveData() {
    const request = await fetch('/zipData');
    try {
        if (!request.ok) {
            throw new Error('Failed to retrieve data');
        }

        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `${Math.round(allData.temperature)} degrees`;
        document.getElementById('content').innerHTML = `You're feeling: ${allData.userResponse}`;
    } catch (error) {
        console.log("error", error);
    }
}
