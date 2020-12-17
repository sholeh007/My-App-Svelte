<script>
	import meetup from "./data/store.js";
	import Header from "./UI/Header.svelte";
	import MeetGrid from "./MeetUp/MeetGrid.svelte";
	import EditMeetup from "./MeetUp/EditMeetup.svelte";
	import MeetupDetail from "./MeetUp/MeetupDetail.svelte";

	let page = "overview";
	let pageData = {};
	let editMode = false;
	let editId;

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
			<EditMeetup
				id={editId}
				on:addMeet={addMeet}
				on:close={closeModal} />
		{/if}
		<MeetGrid
			meets={$meetup}
			on:showDetail={showDetail}
			on:editMeet={editMeet}
			on:add={toggleAddButton} />
	{:else}
		<MeetupDetail id={pageData.id} on:close={closeDetail} />
	{/if}
</main>
