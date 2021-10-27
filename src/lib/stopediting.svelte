<script lang="ts">
	export let editing: boolean = false;
	export let func: () => any = () => {};
</script>

{#if editing}
	<div class="absolute bottom-8 w-full flex justify-center">
		<button class="stop-editing-button" on:click={() => func()}> Stop Editing </button>
	</div>
{/if}

<style lang="postcss">
	.stop-editing-button {
		@apply bg-green-400 text-gray-900 py-5 rounded-lg shadow-2xl;
		@apply w-[80%] sm:w-48 block sm:hidden;
	}
</style>
