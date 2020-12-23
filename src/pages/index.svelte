<script>
  import { onMount } from "svelte";
  import gettingData from "../api/meetApi.js";
  import meetup from "../data/store.js";
  import Header from "../UI/Header.svelte";
  import MeetGrid from "../MeetUp/MeetGrid.svelte";
  import EditMeetup from "../MeetUp/EditMeetup.svelte";
  import MeetupDetail from "../MeetUp/MeetupDetail.svelte";
  import Spinner from "../UI/Spinner.svelte";

  let page = "overview";
  let pageData = {};
  let editMode = false;
  let editId;
  let isLoading = true;

  // get data api
  onMount(async () => {
    const url =
      "https://app-svelte-test-default-rtdb.firebaseio.com/meets.json";
    const data = await gettingData.getData(url);
    const loadDataMeetup = [];

    for (const key in data) {
      loadDataMeetup.push({
        ...data[key],
        id: key,
      });
    }
    setTimeout(() => {
      isLoading = false;
      meetup.getMeetup(loadDataMeetup.reverse());
    }, 1000);
  });

  const toggleAddButton = () => {
    editMode = !editMode;
  };

  const addMeet = () => {
    editMode = !editMode;
    editId = null;
  };

  const editMeet = (event) => {
    editMode = !editMode;
    editId = event.detail;
  };

  const closeModal = () => {
    editMode = !editMode;
    editId = null;
  };

  const showDetail = (event) => {
    page = "detail";
    pageData.id = event.detail;
  };

  const closeDetail = () => {
    page = "overview";
    pageData = {};
  };
</script>

<style>
  main {
    margin-top: 1rem;
  }
</style>

<Header />
<main>
  {#if page === 'overview'}
    {#if editMode}
      <EditMeetup id={editId} on:addMeet={addMeet} on:close={closeModal} />
    {/if}
    {#if isLoading}
      <Spinner />
    {:else}
      <MeetGrid
        meets={$meetup}
        on:showDetail={showDetail}
        on:editMeet={editMeet}
        on:add={toggleAddButton} />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetail} />
  {/if}
</main>
