<script>
  import meetup from "../data/store.js";
  import dataApi from "../api/meetApi.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail, isValidUrl } from "../helper/validation.js";

  const dispatch = createEventDispatcher();
  export let id = null;
  let title = "";
  let address = "";
  let imageUrl = "";
  let email = "";
  let description = "";
  let validForm = false;

  $: if (id) {
    const unsubscribe = meetup.subscribe((items) => {
      const selectedMeetup = items.find((item) => item.id === id);
      title = selectedMeetup.title;
      imageUrl = selectedMeetup.imageUrl;
      address = selectedMeetup.address;
      description = selectedMeetup.description;
      email = selectedMeetup.email;
    });
    unsubscribe();
  }

  $: if (
    title &&
    address &&
    isValidUrl(imageUrl) &&
    isValidEmail(email) &&
    description
  ) {
    validForm = true;
  } else {
    validForm = false;
  }

  const handleForm = async () => {
    const newMeets = {
      title,
      imageUrl,
      address,
      description,
      email,
    };
    if (id) {
      const url = `https://app-svelte-test-default-rtdb.firebaseio.com/meets/${id}.json`;
      const setting = {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeets),
      };
      await dataApi.updateData(url, setting);
      meetup.updateDataMeetup(id, newMeets);
    } else {
      const url =
        "https://app-svelte-test-default-rtdb.firebaseio.com/meets.json";
      const setting = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newMeets, isFavorite: false }),
      };
      const data = await dataApi.postData(url, setting);
      meetup.addMeetup({ ...newMeets, isFavorite: false, id: data.name });
    }
    dispatch("addMeet");
  };

  const closeModal = () => {
    dispatch("close");
  };
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Add Meet Data" on:close>
  <form on:submit|preventDefault={handleForm}>
    <TextInput
      id="title"
      label="Title"
      valid={!isEmpty(title)}
      errorMessage="Please enter a valid title"
      value={title}
      on:input={(event) => (title = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={!isEmpty(address)}
      errorMessage="Please enter a valid address"
      value={address}
      on:input={(event) => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image Url"
      valid={isValidUrl(imageUrl)}
      errorMessage="Please enter a valid image url"
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-mail"
      type="email"
      valid={isValidEmail(email)}
      errorMessage="Please enter a valid email"
      value={email}
      on:input={(event) => (email = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      rows="3"
      valid={!isEmpty(description)}
      errorMessage="Please enter a valid description"
      bind:value={description} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={closeModal}>Cancel</Button>
    <Button type="button" on:click={handleForm} disabled={!validForm}>
      Save
    </Button>
  </div>
</Modal>
