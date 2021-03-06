const dataApi = {
  getData: async (url) => {
    try {
      const gettingData = await fetch(url);
      const dataMeet = await gettingData.json();

      if (!gettingData.ok) {
        throw new Error('Failed to get data!');
      };
      return dataMeet;
    } catch (err) {
      throw new Error(err);
    }
  },
  postData: async (url, setting) => {
    try {
      const sendData = await fetch(url, setting);
      const dataMeet = await sendData.json();

      if (!sendData.ok) {
        throw new Error('Failed to add data!');
      };
      return dataMeet;
    } catch (err) {
      throw new Error(err);
    }
  },
  updateData: async (url, setting) => {
    try {
      const editData = await fetch(url, setting);

      if (!editData.ok) {
        throw new Error('update failed!');
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  deleteData: async (url, setting) => {
    try {
      const removeData = await fetch(url, setting);

      if (!removeData.ok) {
        throw new Error('delete data failed!');
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  isFavoriteData: async (url, setting) => {
    try {
      const favData = await fetch(url, setting);

      if (!favData.ok) {
        throw new Error('something wrong!');
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default dataApi;