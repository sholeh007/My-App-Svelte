<script>
	import Header from "./UI/Header.svelte";
	import MeetGrid from "./MeetUp/MeetGrid.svelte";
	import EditMeetup from "./MeetUp/EditMeetup.svelte";
	import Button from "./UI/Button.svelte";

	let meets = [
		{
			id: 1,
			title: "Coding bootcamp",
			imageUrl:
				"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Felevenfifty.org%2Fwp-content%2Fuploads%2F2017%2F04%2FCoding-Bootcamp-1-880x499.jpg&f=1&nofb=1",
			address: "str.addb 53467, new york",
			description: "learning coding from zero to hero",
			email: "test@test.com",
			isFavorite: false,
		},
		{
			id: 2,
			title: "Swimming Pool",
			imageUrl:
				"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fthewowstyle.com%2Fwp-content%2Fuploads%2F2015%2F01%2Findoor-swimming-pool..jpg&f=1&nofb=1",
			address: "str.nmjs 982563, canada",
			description: "swimming as you can",
			email: "normal@test.com",
			isFavorite: false,
		},
	];

	let addButton = false;
	const toggleAddButton = () => {
		addButton = !addButton;
	};

	const addMeet = (event) => {
		let newMeets = {
			id: Math.random(),
			...event.detail,
		};

		meets = [...meets, newMeets];
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
	<MeetGrid {meets} on:toggleFavorite={toggleFavorite} />
</main>
