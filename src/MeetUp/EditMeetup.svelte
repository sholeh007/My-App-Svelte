<script>
  import meetup from "../data/store.js";
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

  if (id) {
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

  const handleForm = () => {
    const newMeets = {
      title,
      imageUrl,
      address,
      description,
      email,
    };
    if (id) {
      meetup.updateDataMeetup(id, newMeets);
    } else {
      fetch(
        "https://app-svelte-test-default-rtdb.firebaseio.com/meetups.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newMeets, isFavorite: false }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          throw new err();
        });
      meetup.addMeetup(newMeets);
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
