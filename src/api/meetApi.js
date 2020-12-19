const dataApi = {
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