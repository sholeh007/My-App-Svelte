<script>
	import meetup from "./data/store.js";
	import Header from "./UI/Header.svelte";
	import MeetGrid from "./MeetUp/MeetGrid.svelte";
	import EditMeetup from "./MeetUp/EditMeetup.svelte";
	import Button from "./UI/Button.svelte";
	import MeetupDetail from "./MeetUp/MeetupDetail.svelte";

	let addButton = false;
	let page = "overview";
	let pageData = {};

	const toggleAddButton = () => {
		addButton = !addButton;
	};

	const addMeet = () => {
		addButton = false;
	};

	const closeModal = () => {
		addButton = false;
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
	.meetup-controls {
		margin: 1rem;
	}
</style>

<Header />
<main>
	{#if page === 'overview'}
		<div class="meetup-controls">
			<Button on:click={toggleAddButton}>New Meetup</Button>
		</div>
		{#if addButton}
			<EditMeetup on:addMeet={addMeet} on:close={closeModal} />
		{/if}
		<MeetGrid meets={$meetup} on:showDetail={showDetail} />
	{:else}
		<MeetupDetail id={pageData.id} on:close={closeDetail} />
	{/if}
</main>
