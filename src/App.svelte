<script>
	import meetup from "./data/store.js";
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
			...event.detail,
		};
		meetup.addMeetup(newMeets);
		addButton = false;
	};

	const toggleFavorite = (event) => {
		const id = event.detail;
		meetup.toggleFavorite(id);
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
	<MeetGrid meets={$meetup} on:toggleFavorite={toggleFavorite} />
</main>
