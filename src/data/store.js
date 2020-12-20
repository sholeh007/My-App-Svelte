import {
  writable
} from "svelte/store";

const dataMeet = writable([]);

const customMeetupsStore = {
  subscribe: dataMeet.subscribe,
  getMeetup: (data) => {
    dataMeet.set(data)
  },
  addMeetup: (meetupData) => {
    const newMeetup = {
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
    });
  },
  updateDataMeetup: (id, data) => {
    dataMeet.update(items => {
      const meetupIndex = items.findIndex(item => item.id === id);
      const updateMeetup = {
        ...items[meetupIndex],
        ...data
      };
      const updateMeetups = [...items];
      updateMeetups[meetupIndex] = updateMeetup;
      return updateMeetups;
    });
  },
  removeMeetup: (id) => {
    dataMeet.update(items => {
      return items.filter(item => item.id !== id);
    })
  }
}

export default customMeetupsStore;