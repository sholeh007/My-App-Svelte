import {
  writable
} from "svelte/store";

const dataMeet = writable([{
    id: 1,
    title: "Coding bootcamp",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Felevenfifty.org%2Fwp-content%2Fuploads%2F2017%2F04%2FCoding-Bootcamp-1-880x499.jpg&f=1&nofb=1",
    address: "str.addb 53467, new york",
    description: "learning coding from zero to hero",
    email: "test@test.com",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Swimming Pool",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fthewowstyle.com%2Fwp-content%2Fuploads%2F2015%2F01%2Findoor-swimming-pool..jpg&f=1&nofb=1",
    address: "str.nmjs 982563, canada",
    description: "swimming as you can",
    email: "normal@test.com",
    isFavorite: false,
  },

])

const customMeetupsStore = {
  subscribe: dataMeet.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      id: Math.random(),
      ...meetupData
    };
    dataMeet.update(items => {
      return [newMeetup, ...items];
    })
  },
  toggleFavorite: (id) => {
    dataMeet.update(items => {
      const updateMeetup = {
        ...items.find((meet) => meet.id === id)
      };
      updateMeetup.isFavorite = !updateMeetup.isFavorite;
      const meetsIndex = items.findIndex((meet) => meet.id === id);
      const updateMeetups = [...items];
      updateMeetups[meetsIndex] = updateMeetup;
      return updateMeetups;
    })
  }
}

export default customMeetupsStore;