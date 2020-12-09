<script>
	import DataMeet from "./data/store.js";
	import Header from "./UI/Header.svelte";
	import MeetGrid from "./MeetUp/MeetGrid.svelte";
	import EditMeetup from "./MeetUp/EditMeetup.svelte";
	import Button from "./UI/Button.svelte";

	let addButton = false;
	const toggleAddButton = () => {
		addButton = !addButton;
	};

	const addMeet = (event) => {
		let newMeets = {
			id: Math.random(),
			...event.detail,
		};

		$DataMeet = [...$DataMeet, newMeets];
		addButton = false;
	};

	const toggleFavorite = (event) => {
		const id = event.detail;
		const updateMeetup = { ...meets.find((meet) => meet.id === id) };
		updateMeetup.isFavorite = !updateMeetup.isFavorite;
		const meetsIndex = meets.findIndex((meet) => meet.id === id);
		const updateMeetups = [...meets];
		updateMeetups[meetsIndex] = updateMeetup;
		meets = updateMeetups;
	};

	const closeModal = () => {
		addButton = false;
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
	<div class="meetup-controls">
		<Button on:click={toggleAddButton}>New Meetup</Button>
	</div>
	{#if addButton}
		<EditMeetup on:addMeet={addMeet} on:close={closeModal} />
	{/if}
	<MeetGrid meets={$DataMeet} on:toggleFavorite={toggleFavorite} />
</main>
