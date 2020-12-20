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
  }
}

export default dataApi;