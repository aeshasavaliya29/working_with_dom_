const eventData = JSON.parse(localStorage.getItem('events')) || [];

// Function to save event data in local storage
const saveEventData = () => {
          localStorage.setItem('events', JSON.stringify(eventData));
};

// Function to render events in the browser
const renderEvents = () => {
          const eventList = document.getElementById('eventList');
          eventList.innerHTML = '';

          eventData.map((event, index) => {
                    const { name, date } = event;

                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>${name}</strong> - ${date} <button class="removeEvent" data-index="${index}">Remove</button>`;
                    eventList.appendChild(listItem);
          });

          // Attach event listener to remove buttons
          const removeButtons = document.getElementsByClassName('removeEvent');
          Array.from(removeButtons).forEach(button => {
                    button.addEventListener('click', removeEvent);
          });
};

// Function to add a new event
const addEvent = (event) => {
          event.preventDefault();

          const eventName = document.getElementById('eventName').value;
          const eventDate = document.getElementById('eventDate').value;

          const newEvent = { name: eventName, date: eventDate };
          eventData.push(newEvent);

          saveEventData();
          renderEvents();

          document.getElementById('eventForm').reset();
};

// Function to remove an event
const removeEvent = (event) => {
          const index = event.target.dataset.index;
          eventData.splice(index, 1);

          saveEventData();
          renderEvents();
};

const eventForm = document.getElementById('eventForm');
eventForm.addEventListener('submit', addEvent);

const clearLocalStorageButton = document.getElementById('clearLocalStorage');
clearLocalStorageButton.addEventListener('click', () => {
          localStorage.clear();
          eventData.length = 0;
          renderEvents();
});

renderEvents();