const dataApi = {
  getData: async (url) => {
    const gettingData = await fetch(url);
    const dataMeet = await gettingData.json();

    if (!gettingData.ok) {
      throw new Error('Failed to get data!');
    };
    return dataMeet;
  },
  postData: async (url, setting) => {
    const sendData = await fetch(url, setting);
    const dataMeet = await sendData.json();

    if (!sendData.ok) {
      throw new Error('Failed to add data!');
    };
    return dataMeet;
  }
}

export default dataApi;